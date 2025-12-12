import { useQuery } from "@tanstack/react-query"
import { getCategories, getProductData } from "../api/postApi";
import { ProductCard } from "../components/UI/ProductCard";
import "../components/css/product.css"
import { useEffect, useState } from "react";
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
    const [selectedCategory, setSelectedCategory]= useState("all");

    // useQuery for products
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProductData,
        
        refetchOnWindowFocus: false,  // it will not re-fetch when we switch tabs
        refetchOnMount: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    

    // useQuery for categories
    const { data: categoryData }= useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: Infinity,
        cacheTime: Infinity
    })

    if (isLoading) {
        return (
            <div className="loading">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="loading">
                <h2>Error: {error.message}</h2>
            </div>
        );
    }

    const products = data.data.products;
    console.log("products= ", products);

    console.log("category data= ",categoryData);


    

    //search logic & category logic
    const filteredProducts = products.filter((item) => {
        const query= searchQuery.toLowerCase();
        
        const titleMatch= item.title.toLowerCase().includes(query);
        const categoryMatch= item.category.toLowerCase().includes(query);

        const matchesSearch= titleMatch || categoryMatch;

        const matchesCategory= selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });



    return (
        <main className="container product-page">
            <h1 className="product-title">Our Products</h1>

            {/* Search */}
            <input id="search" type="text" placeholder="Search products..." className="product-search" value={search} onChange={(e) => setSearch(e.target.value)} />

            {/* Category filter */}
            <select id="category" className="product-category-filter" value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)} >
                <option value="all">All Categories</option>
                {categoryData?.data?.map((categ)=> (
                    <option key={categ.slug} value={categ.slug} >
                        {categ.name}
                    </option>
                ))}
            </select>

            <ul className="product-grid">
                {filteredProducts.map((currProd) => {
                    return <ProductCard key={currProd.id} product={currProd} />
                })}
            </ul>
        </main>
    );
}