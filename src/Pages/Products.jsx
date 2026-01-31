import { useQuery } from "@tanstack/react-query"
import { getCategories, getProductData } from "../api/postApi";
import { ProductCard } from "../components/UI/ProductCard";
import "../components/css/product.css"
import { useEffect, useMemo, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
export const Products = () => {

    // filters
    const [showFilters, setShowFilters] = useState(false);

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

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 12;

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
        result.sort((a, b) => {

            //price is primary
            if (activeSort === "price-low-high") {
                if (a.price != b.price) return a.price - b.price;
                return b.rating - a.rating; // tie breaker
            }

            if (activeSort === "price-high-low") {
                if (a.price != b.price) return b.price - a.price;
                return b.rating - a.rating; // tie breaker
            }

            //rating is primary
            if (activeSort === "rating-high-low") {
                if (a.rating != b.rating) return b.rating - a.rating;
                return a.price - b.price; // tie breaker
            }

            if (activeSort === "rating-low-high") {
                if (a.rating != b.rating) return a.rating - b.rating;
                return a.price - b.price; // tie breaker
            }

            return 0;
        });

        return result;

    }, [products, searchQuery, selectedCategory, sortPrice, sortRating]);


    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, sortPrice, sortRating]);


    // pagination responsive logic
    const MAX_VISIBLE_PAGES = 5;
    const getVisiblePages = () => {
        const pages = [];
        let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let end = start + MAX_VISIBLE_PAGES - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }



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


            <div className="product-search-with-filter">
                {/* Search */}
                <input id="search" type="search" placeholder="Search products..." className="product-search" value={search} onChange={(e) => setSearch(e.target.value)} />

                <button className="product-filter-toggle-btn" onClick={() => setShowFilters(!showFilters)} aria-label={showFilters ? "Close Filters" : "Open Filters"}>
                    {showFilters ? <IoCloseOutline /> : <IoIosSettings />}
                </button>
                <div className={`product-filter-drawer ${showFilters ? "open" : ""}`}>
                    <h3>Filters</h3>

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
            </div>


            <ul className="product-grid">
                {paginatedProducts.map((currProd) => {
                    return <ProductCard key={currProd.id} product={currProd} />
                })}
            </ul>

            <div className="pagination">
                <button
                    disabled={currentPage == 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </button>

                {/* {Array.from({length: totalPages}, (_,i)=> (
                    <button 
                    key={i}
                    className={currentPage == i+1 ? "active" : ""}
                    onClick={()=> setCurrentPage(i+1)}
                    >
                        {i+1}
                    </button>
                ))} */}

                {currentPage > 3 && (
                    <>
                        <button onClick={() => setCurrentPage(1)}>1</button>
                        <span className="dots">...</span>
                    </>
                )}

                {getVisiblePages().map((page) => (
                    <button key={page} className={currentPage === page ? "active" : ""}
                        onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}

                {currentPage < totalPages - 2 && (
                    <>
                        <span className="dots">...</span>
                        <button onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                        </button>
                    </>
                )}

                <button disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </main>
    );
}