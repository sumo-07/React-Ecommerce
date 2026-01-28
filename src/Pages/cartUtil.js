const cartKey= "cart";

//get Cart
export const getCart= ()=>{
    try{
        const cart= localStorage.getItem(cartKey);
        return cart ? JSON.parse(cart) : [];
    }
    catch(e){
        console.error("Invalid cart data, resetting the cart now")
        localStorage.removeItem(cartKey);
        return [];
    }
    
};


// save Cart
export const saveCart= (cart)=> {
    localStorage.setItem(cartKey, JSON.stringify(cart));
};

// add to Cart
export const addToCart= (product)=>{
    const cart= getCart();
    const existing= cart.find(item => {
        return item.id === product.id
    });

    if(existing){
        existing.quantity +=1;
    }
    else{
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
        });
    }
    saveCart(cart);
};

//remove from cart
export const removeFromCart= (id)=> {
    const cart= getCart().filter(item => {
        return item.id !== id;
    });
    saveCart(cart);
};

//// update qty
/* 
// old logic
export const updateQuantity= (id, amount)=> {
    const cart= getCart().map(item => {
        return item.id === id ? {...item, quantity: Math.max(1, item.quantity + amount)} : item;
    });

    saveCart(cart);
};
*/

//new logic update qty
export const updateQuantity= (id, amount)=>{
    let cart= getCart();
    cart= cart.map((item)=> {
        if(item.id === id){
            const newQty= item.quantity + amount;

            if(newQty <= 0) return null;

            return {...item, quantity: newQty};
        }
        return item;
    })
    .filter(item=> item !== null);

    saveCart(cart);
}



//check if product exist (dynamic add to cart behavior for - qty + and remove button)
export const getCartItem= (id)=> {
    const cart= getCart();
    return cart.find(item => item.id === id); //returns undefined if product is not in the cart
}



