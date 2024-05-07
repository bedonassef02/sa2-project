import axios from 'axios';

const usersServiceApi = axios.create({
    baseURL: 'http://localhost:3001/users',
});

const CategoriesServiceApi = axios.create({
    baseURL: 'http://localhost:3003/category',
})
const productsServiceApi = axios.create({
    baseURL: 'http://localhost:5001/api',
});


const weatherServiceApi = axios.create({
    baseURL: 'http://localhost:5002/api',
});

const shoppingCartServiceApi = axios.create({
    baseURL: 'http://localhost:5003/api',
});

export const userAuthenticate = payload => usersServiceApi.post(`/login`, payload);
export const userRegsiter = payload => usersServiceApi.post(`/register`, payload);
export const getAllProducts = () => productsServiceApi.get(`/products`);
export const getCategories = () => CategoriesServiceApi.get(`/`);
export const getWeather = () => weatherServiceApi.get(`/weather`);

export const getProductsFromCart = id => shoppingCartServiceApi.get(`/cart/${id}`);
export const addProductToCart = payload => shoppingCartServiceApi.post(`/cart`, payload);

const apis = {
    userAuthenticate,
    getAllProducts,
    getWeather,
    getProductsFromCart,
    addProductToCart,
    userRegsiter,
    getCategories
}

export default apis;