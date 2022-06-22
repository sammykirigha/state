import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { baseUrl } from "./services/products";
import useFetchAll from "./services/useFetchAll";
 
const Cart = ({ cart, updateQuantity }) => {
	const urls = cart.map((i) => `shoes/${i.id}`);
	console.log(urls);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('')
	const navigate = useNavigate()
	
	useEffect(() => {
		const promises = urls.map((url) => 
			axios.get(baseUrl + url).then((res) => {
				// console.log(res);
				return res.data
			})
		)

		Promise.all(promises).then((res) => setData(res)).catch((e) => {
			setError(e)
		}).finally(()=> setLoading(false))
	}, [])
	

	console.log(data);

	function renderItem(itemInCart) {
		const { id, sku, quantity } = itemInCart;
		const prodData = data;
        const { price, name, image, skus } = prodData?.find((p) => p.id === parseInt(id));
		const { size } = skus.find((s) => s.sku === sku);
		
		const totalPrice = quantity * price
        return (
            <li key={sku} className="bg-gray-100 border rounded-md">
				<img src={image} alt={name} height="150px" width="150px" className="m-2" />
				<div className="flex flex-col items-center justify-center">
					<h3 className="text-lg text-slate-900 font-bold">{name}</h3>
					<p className="text-md text-gray-800 mb-3">Size: {size}</p>
					<p className="text-md text-gray-800 mb-3">${price}</p>
					<p className="text-md text-gray-800 mb-3">Total Price: {totalPrice} </p>
					<p>
						<select
							aria-label={`select quantity for ${name} size ${size}`}
							onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
							value={quantity}
						>
							<option value="0">Remove</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</p>
				</div>
            </li>
        );
	}

	if(loading) return <h2>Loading data....</h2>
	
	const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
	return (
		<section>
			<h1 className="mb-8 text-lg text-slate-900 font-bold">{totalItems === 0 ? "our cart is empty" : `${totalItems} Item${totalItems > 1 ? "s" : ""} in my cart`}</h1>
			<ul className="flex flex-row gap-10">{cart.map(renderItem)}</ul>
			{ cart.length > 0 && <button className="bg-blue-500 text-md text-white py-2 px-2 rounded-md " onClick={() => navigate('/checkout')}>Checkout</button>}
		</section>
	)
	
};

export default Cart;
