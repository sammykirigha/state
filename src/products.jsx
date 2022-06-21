import { useEffect, useState } from "react";
import { getProducts } from "./services/products";


function Products() {
    const [size, setSize] = useState("");
    const [products, setProducts] = useState([])
    const [error, setError] = useState("") 

    useEffect(() => {
        async function getShoes() {
            try {
                const res = await getProducts("shoes")
                setProducts(res)
            } catch (error) {
                setError(error)
            } 
        }
         getShoes()   
    },[])

    const renderProduct = (p) => {
        return (
            <div key={p.id} className="border  p-4">
                <a href="/">
                    <img
                        src={p.image}
                        alt={p.name}
                        height="100px"
                        width="100px"
                    />
                    <h3>{p.name}</h3>
                    <p className="text-md text-slate-900 mt-3">
                        Ksh: {p.price}
                    </p>
                </a>
            </div>
        );
    };

    const filteredProducts = size
        ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
        : products;
    return (
            <div className="mt-10">
                <section>
                    <label>Filter by Size:</label>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <option value="">All sizes</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    {size && <p>Found { filteredProducts.length} items</p>}
                </section>
                <section className="flex flex-row gap-10 mt-10 ml-8">
                    {filteredProducts.map(renderProduct)}
                </section>
            </div>
    );
}

export default Products