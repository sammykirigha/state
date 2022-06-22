import React, { useState } from "react";

const getErrors = (address) => {
        const result = {};
          if (!address.city)  result.city = "City is required";
		if (!address.country)  result.country = "Country is required";
        return result;
    };


const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
};
const emptyAddress = {
    city: "",
    country: "",
};

const Checkout = ({ cart, emptyCart }) => {
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE);
	const [saveError, setSaveError] = useState(null);
	const [touched, setTouched] = useState({})

    
    const errors = getErrors(address);
    const isValid = Object.keys(errors).length === 0;
    function handleChange(e) {
        setAddress((curAddress) => {
            return {
                ...curAddress,
                [e.target.id]: e.target.value,
            };
        });
    }

	const handleBlur = (event) => {
		setTouched((cur) => {
			return {
				...cur,
				[event.target.id]: true
			}
		})
	};

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus(STATUS.SUBMITTING);
        if (isValid) {
            try {
                console.log("saving your data");
                emptyCart();
                setStatus(STATUS.COMPLETED);
            } catch (error) {
                setSaveError(error);
            }
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    if (status === STATUS.COMPLETED) {
        return <h2>Thank For Shopping with us.....</h2>;
    }
    return (
        <div>
            <h1 className="text-lg text-slate-900 font-bold">Shipping Info</h1>
            {!isValid && status === STATUS.SUBMITTED && (
                <div>
                    <p>please handle the errors</p>
                    <ul>
                        {Object.keys(errors).map((key) => {
                            return <li key={key}>{errors[key]}</li>;
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>City</label>
                    <br />
                    <input
                        id="city"
                        type="text"
                        value={address.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className="w-[150px] outline outline-gray-200 rounded-md px-2 py-2 mt-2"
					/>
					{(touched.city || status === STATUS.SUBMITTED) && errors.city}
                </div>

                <div className="mt-8">
                    <label className=" text-md text-gray-900">Country</label>
                    <br />
                    <select
                        id="country"
                        value={address.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="w-[150px] outline outline-gray-200 rounded-md px-2 py-2 mt-2"
                    >
                        <option value="">Select Country</option>
                        <option value="China">China</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Kenya">Kenya</option>
					</select>
					{(touched.country || status === STATUS.SUBMITTED) && errors.country}
                </div>

                <div>
                    <input
                        type="submit"
                        disabled={status === STATUS.SUBMITTING}
                        className={`text-white bg-blue-600 px-2 py-2 rounded-md mt-6 ${
                            status === STATUS.SUBMITTING &&
                            "cursor-progress bg-blue-400"
                        }`}
                        value="Save shipping info"
                    />
                </div>
            </form>
        </div>
    );
};

export default Checkout;
