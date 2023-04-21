import './App.css';
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";


function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={[<Header/>, <Home/>]}/>
                    <Route path="/checkout" element={[<Header/>, <Checkout/>]}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
