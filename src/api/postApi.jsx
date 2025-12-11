import axios from "axios"
const api= axios.create({
    baseURL: "https://dummyjson.com"
});

export const getProductData= ()=>{
    return api.get("/products?limit=16")
}