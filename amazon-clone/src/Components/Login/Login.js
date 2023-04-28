import './Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";


const Login = () => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
    }

    const register = e => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <Link to='/'>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    className="login_logo"/>
            </Link>

            <div className="login_container">
                <h1>Sign in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}/>

                    <h5>Password</h5>
                    <input type="password" onChange={e => {setPassword(e.target.value)}}/>


                    <button
                        className="login_signInBtn"
                        type="submit"
                        onClick={signIn}
                    >
                        Sign In
                    </button>

                    <p>By signing-in you agree to the AMAZON's Conditions of Use & Sale. Please see our Privacy Notice,
                        our Cookies Notice and our Interest-Based Ads Notice.</p>

                    <button className="login_registerBtn">Create your Amazon Account</button>

                </form>
            </div>

        </div>
    )
};

export default Login;

