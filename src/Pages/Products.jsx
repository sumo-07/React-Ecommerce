import {useQuery} from "@tanstack/react-query"
import { getProductData } from "../api/postApi";
import { ProductCard } from "../components/UI/ProductCard";
import "../components/css/product.css"
export const Products= ()=>{

    

    const {data, isLoading, isError, error}= useQuery({
        queryKey: ["products"],
        queryFn: getProductData,
    });

    if(isLoading){
        return(
            <div className="loading">
                <h2>Loading products...</h2>
            </div>
        );
    }

    if(isError){
        return(
            <div className="loading">
                <h2>Error: {error.message}</h2>
            </div>
        );
    }

    const products= data.data.products;
    console.log("products= ",products);

    return(
        <main className="container product-page">
            <h1 className="product-title">Our Products</h1>

            <ul className="product-grid">
                {products.map((currProd)=>{
                    return <ProductCard key={currProd.id} product= {currProd}/>
                })}
            </ul>
        </main>
    );
}