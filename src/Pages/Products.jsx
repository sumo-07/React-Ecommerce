import { useQuery } from "@tanstack/react-query"
import { getCategories, getProductData } from "../api/postApi";
import { ProductCard } from "../components/UI/ProductCard";
import "../components/css/product.css"
import { useEffect, useMemo, useState } from "react";
export const Products = () => {

    // search
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    //debouncing for search
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(search);
        }, 600);

        return () => clearTimeout(timeout);
    }, [search]);


    // category
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Sorting 
    const [sortPrice, setSortPrice] = useState("");
    const [sortRating, setSortRating] = useState("");

    // useQuery for products
    const { data, isLoading: productLoading, isError: productError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProductData,

        refetchOnWindowFocus: false,  // it will not re-fetch when we switch tabs
        refetchOnMount: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });



    // useQuery for categories
    const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: Infinity,
        cacheTime: Infinity
    })



    const products = data?.data?.products ?? [];
    console.log("products= ", products);

    console.log("category data= ", categoryData);


    //sortLogic like amazon
    const activeSort = sortPrice || sortRating;

    //search logic & category logic & sort logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        const query = searchQuery.toLowerCase();
        result = result.filter((item) => {

            const titleMatch = item.title.toLowerCase().includes(query);
            const categoryMatch = item.category.toLowerCase().includes(query);

            const matchesSearch = titleMatch || categoryMatch;

            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });


        //Sorting Logic
        // if (sortPrice === "price-low-high") {
        //     result.sort((a, b) => a.price - b.price);
        // }

        // if (sortPrice === "price-high-low") {
        //     result.sort((a, b) => b.price - a.price);
        // }

        // if (sortRating === "rating-high-low") {
        //     result.sort((a, b) => b.rating - a.rating);
        // }

        // if (sortRating === "rating-low-high") {
        //     result.sort((a, b) => a.rating - b.rating);
        // }

        // return result;

        result.sort((a, b) => {

            //price is primary
            if (activeSort === "price-low-high") {
                if(a.price!= b.price) return a.price - b.price;
                return b.rating - a.rating; // tie breaker
            }

            if (activeSort === "price-high-low") {
                if(a.price!= b.price) return b.price - a.price;
                return b.rating - a.rating; // tie breaker
            }

            //rating is primary
            if(activeSort === "rating-high-low"){
                if(a.rating != b.rating) return b.rating - a.rating;
                return a.price - b.price; // tie breaker
            }

            if(activeSort === "rating-low-high"){
                if(a.rating != b.rating) return a.rating - b.rating;
                return a.price - b.price; // tie breaker
            }

            return 0;
        });

        return result;

    }, [products, searchQuery, selectedCategory, sortPrice, sortRating]);



    if (productLoading) {
        return (
            <div className="loading">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (productError) {
        return (
            <div className="loading">
                <h2>Error: {error.message}</h2>
            </div>
        );
    }


    return (
        <main className="container product-page">
            <h1 className="product-title">Our Products</h1>

            {/* Search */}
            <input id="search" type="text" placeholder="Search products..." className="product-search" value={search} onChange={(e) => setSearch(e.target.value)} />

            <div className="filter-container">
                {/* Category filter */}
                <select id="category" className="product-category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
                    <option value="all">All Categories</option>
                    {categoryData?.data?.map((categ) => (
                        <option key={categ.slug} value={categ.slug} >
                            {categ.name}
                        </option>
                    ))}
                </select>


                {/* Sort by price */}
                <select id="sort-price" className="product-sort-filter" value={sortPrice} 
                    onChange={(e) => {
                        setSortPrice(e.target.value); 
                        setSortRating("");
                }}  >
                    <option value="">Sort by Price</option>
                    <option value="price-low-high">Price: Low → High</option>
                    <option value="price-high-low">Price: High → Low</option>
                </select>

                {/* Sort by rating */}
                <select id="sort-rating" className="product-category-filter" value={sortRating} 
                onChange={(e) => {
                    setSortRating(e.target.value)
                    setSortPrice("");     
                }} >
                    <option value="">Sort by Rating</option>
                    <option value="rating-low-high">Rating: Low → High</option>
                    <option value="rating-high-low">Rating: High → Low</option>
                </select>
            </div>

            <ul className="product-grid">
                {filteredProducts.map((currProd) => {
                    return <ProductCard key={currProd.id} product={currProd} />
                })}
            </ul>
        </main>
    );
}