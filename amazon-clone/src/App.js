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
import Payment from "./Components/Checkout/Payment"


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('the user is ', authUser);

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
                    <Route path="/payment" element={[<Header/>, <Payment />]}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
