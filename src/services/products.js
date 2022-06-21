import axios from "axios";

const baseUrl = "http://localhost:3000/"

export async function getProducts(category){
	const {data} = await axios.get(baseUrl + category)
	 return data
}

export async function getProduct(id){
	const {data} = await fetch(baseUrl + id);
	 return data
}