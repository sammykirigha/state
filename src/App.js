import Products from "./products";
import {Routes, Route} from 'react-router-dom'
import Detail from "./Detail";
import Cart from "./Cart";
import Header from "./Header";

function App() {
   
    return (
        <div className="mx-4 mt-10">
            <Header />
            <main className="mt-10">
                <Routes>
                    <Route path="/" element={<h2>welcome back</h2>} />
                    <Route path="/:category"  element={<Products />} />
                 <Route path="/:category/:id" element={<Detail />} />
                 <Route path="/cart" element={<Cart /> } />
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
