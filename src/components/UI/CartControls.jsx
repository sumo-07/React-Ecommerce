import { addToCart, removeFromCart, updateQuantity, getCartItem } from "../../Pages/cartUtil";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
//  css of this is inside cart.css
export const CartControls = ({ product }) => {
    // in cartItem we are storing details of a particular product
    const [cartItem, setCartItem] = useState(null);

    useEffect(() => {
        setCartItem(getCartItem(product.id));
    }, []);

    // this is to sync with the cart data
    const refresh = () => {
        setCartItem(getCartItem(product.id));
    }

    if (!cartItem) {
        return (
            <button className="product-add-to-cart-btn" onClick={() => {
                addToCart(product);
                refresh();
            }}>
                Add to Cart
            </button>
        );
    }

    return (

        <div className="cart-qty">
            <button onClick={() => {
                updateQuantity(product.id, -1);
                refresh();
            }}>
                -
            </button>

            <span>{cartItem.quantity}</span>

            <button onClick={() => {
                updateQuantity(product.id, 1);
                refresh();
            }}>
                +
            </button>



            <button className="remove-btn" onClick={() => {
                removeFromCart(product.id);
                refresh();
            }}>
                <MdDeleteOutline />
            </button>
        </div>
    );
}