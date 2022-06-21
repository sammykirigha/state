import Products from "./products";


function App() {
   
    return (
        <div className="mx-4 mt-10">
            <h2>My logo and links</h2>
            <main className="mt-10">
                <Products />
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
