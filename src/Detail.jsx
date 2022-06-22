import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { getProduct } from "./services/products";

const Detail = (props) => {
    const { category, id } = useParams();
    const [product, setProduct] = useState({});
    const [sku, setSku] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getShoes() {
            try {
                const res = await getProduct(`${category}/${id}`);
                setProduct(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getShoes();
    }, []);

    if (loading) return <h3>Loading data.......</h3>;
    if (!product) return <PageNotFound />;

    console.log(id, sku);
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className="flex flex-row items-center">
                <p>Select your size</p>

                <select
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="mt-5 mb-8 ml-5 outline"
                >
                    <option value="">What size?</option>
                    {product.skus.map((sku, i) => {
                        return (
                            <option value={sku.sku} key={i}>
                                {sku.size}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button
                disabled={!sku}
				onClick={() => {
					props.addToCart(id, sku)
					navigate("/cart")
				}}
                className={`bg-blue-600 mb-8 text-md rounded-md px-3 py-2 w-auto text-white ${
                    !sku
                        ? " bg-blue-300 cursor-not-allowed"
                        : "bg-blue-600 cursor-pointer"
                }`}
            >
                Add To Cart
            </button>
            <img
                src={product.image}
                alt={product.category}
                height="100px"
                width="100px"
            />
        </div>
    );
};

export default Detail;
