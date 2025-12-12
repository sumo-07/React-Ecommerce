import axios from "axios"
const api= axios.create({
    baseURL: "https://dummyjson.com"
});

//get products
export const getProductData= ()=>{
    return api.get("/products?limit=16")
}

//get categories of the products
export const getCategories= ()=>{
    return api.get("/products/categories");
}
