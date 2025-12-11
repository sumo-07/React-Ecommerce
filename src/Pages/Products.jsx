import { useQuery } from "@tanstack/react-query"
import { getProductData } from "../api/postApi";
import { ProductCard } from "../components/UI/ProductCard";
import "../components/css/product.css"
import { useEffect, useState } from "react";
export const Products = () => {

    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    //debouncing for search
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(search);
        }, 600);

        return () => clearTimeout(timeout);
    }, [search]);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProductData,
        
        refetchOnWindowFocus: false,  // it will not re-fetch when we switch tabs
        refetchOnMount: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

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

    //search
    const filteredProducts = products.filter((item) => {
        const titleMatch= item.title.toLowerCase().includes(searchQuery.toLowerCase())
        const categoryMatch= item.category.toLowerCase().includes(searchQuery.toLowerCase())
        return titleMatch || categoryMatch;
    });



    return (
        <main className="container product-page">
            <h1 className="product-title">Our Products</h1>

            {/* Search */}
            <input id="search" type="text" placeholder="Search products..." className="product-search" value={search} onChange={(e) => setSearch(e.target.value)} />


            <ul className="product-grid">
                {filteredProducts.map((currProd) => {
                    return <ProductCard key={currProd.id} product={currProd} />
                })}
            </ul>
        </main>
    );
}