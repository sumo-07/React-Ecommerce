import { useEffect, useState } from "react"
import { getCart, removeFromCart, updateQuantity } from "./cartUtil"
import "../components/css/cart.css"
import { MdDeleteOutline } from "react-icons/md";

export const Cart = () => {
    const [cart, setCart] = useState([]);

    //load cart once the page mounts 
    useEffect(() => {
        setCart(getCart());
    }, []);

    //handle remove
    const handleRemove = (id) => {
        removeFromCart(id);
        setCart(getCart());
    };

    //handle Qty
    const handleQuantity = (id, amount) => {
        updateQuantity(id, amount);
        setCart(getCart());
    };

    // total price
    const totalPrice = (cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0)).toFixed(2);
    // totalPrice= totalPrice.toFixed(2);

    return (
        <main className="container cart-page">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => {
                            return (
                                <li key={item.id} className="cart-item">
                                    <img src={item.thumbnail} alt={item.title} />

                                    <div className="cart-info">
                                        <h3>{item.title}</h3>
                                        <p>₹ {item.price}</p>

                                        <div className="cart-qty">
                                            <button onClick={() => handleQuantity(item.id, -1)}> - </button>

                                            <span>{item.quantity}</span>

                                            <button onClick={() => handleQuantity(item.id, 1)}> + </button>
                                        </div>

                                        <button className="remove-btn" onClick={() => handleRemove(item.id)}> 
                                            <MdDeleteOutline />    
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="cart-total">
                        <h2>Total: ₹ {totalPrice}</h2>
                    </div>
                </>
            )}
        </main>
    );
};