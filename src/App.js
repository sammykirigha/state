import Products from "./products";
import {Routes, Route} from 'react-router-dom'
import Detail from "./Detail";
import Cart from "./Cart";
import Header from "./Header";
import { useState } from "react";

function App() {
    const [cart, setCart] = useState([])
    console.log(cart);

    const addToCart = (id, sku) => {
        setCart((items) => {
            const itemInCart = items.find((i) => i.sku === sku);
            if (itemInCart) {
                //return a new array with the matching item replaced
                return items.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1} : i)
            } else {
                return [...items, {id, sku, quantity: 1}]
            }
        })
    }

    const updateQuantity = (sku, quantity) => {
        setCart((items) => {
            if (quantity === 0) {
                return items.filter((i) => i.sku !== sku)
            }
           return items.map((i) => (i.sku === sku ? {...i, quantity} : i))
       })
    }
   
    return (
        <div className="mx-4 mt-10">
            <Header />
            <main className="mt-10">
                <Routes>
                    <Route path="/" element={<h2>welcome back</h2>} />
                    <Route path="/:category"  element={<Products />} />
                 <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
                 <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} /> } />
                </Routes>
            </main>
        </div>
    );
}

export default App;

// const Form = ({
//     inputItems = [],
//     headerText = "",
//     submitButtonText = "Submit",
//     onSubmit = () => {},
// }) => {
//     const [inputValues, setInputValues] = useState({});

//     const handleSubmit = () => {
//         onSubmit(inputValues);
//     };

//     const onChange = (itemId) => {
//         return (e) => {
//             setInputValues({ ...inputValues, [itemId]: e.target.value });
//         };
//     };

//     return (
//         <form>
//             <h2>{headerText}</h2>
//             <div>
//                 {inputItems.map((item) => (
//                     <input
//                         key={item.id}
//                         onChange={onChange(item.id)}
//                         placeholder={item.label}
//                         value={inputValues[item.id || ""]}
//                     />
//                 ))}
//             </div>
//             <input value={submitButtonText} type="submit" />
//         </form>
//     );
// };

// const NewsletterForm = () => {
//     const handleNewsletterSignup = (values) => {
//         console.log("you signed ");
//     };

//     return (
//         <Form
//             headerText="Newletter form"
//             inputItems={[
//                 { label: "Enter email", id: 1 },
//                 { label: "Enter name", id: 2 },
//             ]}
//             submitButtonText="Singup for newsletter"
//             onSubmit={handleNewsletterSignup}
//         />
//     );
// };
