const baseUrl = "http://localhost:3000/"

export async function getShippingAddress(userId) {
	return fetch(baseUrl + "shippingAddress" + userId).then((response) => {
		if(response.ok) return response.json()
		throw response
	})
}

export async function saveShippingAddress(address){
	return fetch(baseUrl + "shippingAddress", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(address)
	})
}
