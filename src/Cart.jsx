import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./services/products";
import useFetchAll from "./services/useFetchAll";
 
const Cart = ({ cart, updateQuantity }) => {
	const urls = cart.map((i) => `shoes/${i.id}`);
	console.log(urls);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('')
	// const {data: products, loading, error } = useFetchAll(urls)
	
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
		console.log(skus, sku)
        return (
            <li key={sku}>
				<img src={image} alt={name} height="100px" width="100px" />
				<div>
					<h3>{name}</h3>
					<p>Size: {size}</p>
					<p>${price}</p>
					<p>Total Price: {totalPrice} </p>
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
			<h1>{totalItems === 0 ? "our cart is empty" : `${totalItems} Item ${totalItems > 1 ? "s" : ""} in my cart`}</h1>
			<ul>{ cart.map(renderItem)}</ul>
		</section>
	)
	
};

export default Cart;
