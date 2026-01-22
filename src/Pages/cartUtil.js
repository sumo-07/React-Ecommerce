const cartKey= "cart";

//get Cart
export const getCart= ()=>{
    const cart= localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
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

// update qty
export const updateQuantity= (id, amount)=> {
    const cart= getCart().map(item => {
        return item.id === id ? {...item, quantity: Math.max(1, item.quantity + amount)} : item;
    });

    saveCart(cart);
};



