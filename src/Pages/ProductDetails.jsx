import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../components/css/productDetails.css"
import { getSingleProduct } from "../api/postApi";
import { FaStar } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
// import { addToCart } from "./cartUtil";
import { CartControls } from "../components/UI/CartControls";
export const ProductDetails= ()=>{

    const {id}= useParams();
    console.log( "id= ",id);

    const {data, isLoading, isError}= useQuery({
        queryKey: ["product", id],
        queryFn: ()=> getSingleProduct(id),
        staleTime: Infinity,
    });

    const navigate= useNavigate();

    if(isLoading){
        return <h2 className="loading">Loading product...</h2>
    }

    if(isError){
        return <h2 className="loading">Failed to load product</h2>
    }
    
    console.log("data= ",data);

    const product= data.data;

    return(
        <main className="container product-details-page">

            <button className="go-back-btn" onClick={()=> navigate(-1)}>
                <IoArrowBack /> Back to Products
            </button>

            <div className="product-details-card">

                {/* Image */}
                <div className="product-details-img">
                    <img src={product.thumbnail} alt={product.title} />
                </div>


                {/* Info */}
                <div className="product-details-info">
                    <h1>{product.title}</h1>

                    <p className="details-brand">
                        Brand: <span>{product.brand}</span>
                    </p>

                    <p className="details-category">
                        Category: <span>{product.category}</span>
                    </p>

                    <p className="details-rating">
                        <FaStar /> {product.rating}
                    </p>

                    <p className="details-price">₹ {product.price}</p>

                    <p className="details-desc">{product.description}</p>

                    {/* Stock */}
                    <p className="details-stock">
                        Stock: {" "}
                        <span className={product.stock > 0? "in-stock" : "out of stock"}>
                            {product.stock > 0 ? `${product.stock} available`: "Out of stock"}
                        </span>
                    </p>

                    {product.dimensions && (
                        <div className="details-dimensions">
                            <h4>Dimensions</h4>
                            <p>{product.dimensions.width} ×{" "}
                                {product.dimensions.height} ×{" "}
                                {product.dimensions.depth} cm
                            </p>
                        </div>
                    )}

                     {/* Extra Info */}
                     <div className="details-extra">
                        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                        <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                     </div>

                    {/* <button className="add-to-cart-btn" onClick={()=> addToCart(product)}>
                        Add to Cart
                    </button> */}

                    <CartControls product={product} />
                    
                </div>
            </div>
        </main> 
    );
}