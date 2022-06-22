import { useEffect, useState } from "react"
import { baseUrl } from "./products"
import axios from 'axios'

export default function useFetchAll(urls){
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(null)
	const [error, setError] = useState(null)

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
	
	return {data, loading, error}

	
}