import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../firsebase";


const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(true);




    const register = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((auth) => {
                    // console.log(auth);
                    if (auth) {
                        navigate('/')
                    }
                })
                .catch(error => alert(error.message))
        }


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

                    <h5>Confirm Password</h5>
                    <input type="password" onChange={e => {
                        setConfirmPassword(e.target.value);
                        setPasswordMatch(e.target.value === password)}
                    }/>
                    {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}


                    <p>By signing-in you agree to the AMAZON's Conditions of Use & Sale. Please see our Privacy Notice,
                        our Cookies Notice and our Interest-Based Ads Notice.</p>

                    <button className="login_registerBtn" onClick={register}>Create your Amazon Account</button>

                </form>
            </div>

        </div>
    )
};

export default SignUp;