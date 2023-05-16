import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/Login/Login";
import {useEffect} from "react";
import {auth} from "./firsebase";
import {useDispatch} from "react-redux";
import {setUser} from "./actions/action";
import Payment from "./Components/Checkout/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Components/Orders/Orders";
import Signup from "./Components/Login/Signup";

const promise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);



function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            // console.log('the user is ', authUser);

            if (authUser) {
                // the user just logged in / was logged in
                dispatch(setUser(authUser))

            } else {
                // the user is logged out
                dispatch(setUser(null))
            }
        })
    }, []);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={[<Header/>, <Home/>]}/>
                    <Route path="/checkout" element={[<Header/>, <Checkout/>]}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/payment" element={[<Header/>, <Elements stripe={promise}><Payment /></Elements>]}/>
                    <Route path="/orders" element={[<Header/>, <Orders/>]}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
