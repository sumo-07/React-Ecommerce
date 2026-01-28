import { FaStar, FaRegStar } from "react-icons/fa";
import {NavLink}  from "react-router-dom"
import { addToCart } from "../../Pages/cartUtil";
import { CartControls } from "./CartControls";
// import "../css/product.css"

export const ProductCard= ({product})=>{
    const {id, title, price, thumbnail, category, rating}= product;

    // rating
    const filledStars= Math.floor(rating);
    const emptyStars= 5-filledStars;
    return(
        <li>
            <div className="product-box">

                {/* Product Image */}
                <img src={thumbnail} alt={title} className="product-img" />

                {/* Info */}
                <div className="product-info">
                    <p className="product-card-title">
                        {title.length > 18 ? title.slice(0,18) + "..." : title}
                    </p>

                    {/* Rating Section */}
                    <div className="product-rating">
                        {Array(filledStars).fill().map((_, i)=> (
                            <FaStar key={i} className="star filled" />
                        ))}

                        {Array(emptyStars).fill().map((_, i)=> (
                            <FaRegStar key={i} className="star" />
                        ))}

                        <span className="rating-value" >{rating.toFixed(1)}</span>
                    </div>

                    <p>
                        <span className="product-label">Category:</span> {category}
                    </p>

                    <p>
                        <span className="product-label">Price:</span> ₹ {price}
                    </p>
                    
                    {/* <button className="product-add-to-cart-btn" onClick={()=> addToCart(product)}>Add to Cart</button> */}
                    <CartControls product={product} />

                    <NavLink to={`/product/${id}`} >
                    <button className="product-btn" >Read More</button></NavLink>
                </div>
            </div>
        </li>
    );
};