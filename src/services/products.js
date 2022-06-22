import axios from "axios";

export const baseUrl = "http://localhost:3000/"

export async function getProducts(category){
	const {data} = await axios.get(baseUrl + category)
	 return data
}

export async function getProduct(id){
	const {data} = await axios.get(baseUrl + id);
	 return data
}