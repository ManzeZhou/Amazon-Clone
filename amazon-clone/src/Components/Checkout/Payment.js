import './Payment.css';
import {useSelector} from "react-redux";
import {CheckoutProduct} from "./CheckoutProduct";
import PaymentProduct from "./PaymentProduct";
import {Link} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";
import CurrencyFormat from "react-currency-format";


const Payment = () => {

    const userEmail = useSelector(state => state?.productReducer?.user);
    const basket = useSelector(state => state?.productReducer?.basket);

    //use Stripe
    const stripe = useStripe();
    const elements = useElements();

    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '')
    };
    const getBasketTotal = (basket) => {
        let initialPrice = 0
        let subPrice = basket?.reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, initialPrice);

        return (subPrice);
    };

    const handleSubmit = async (e) => {

    }


    return (<div className="payment">
        <div className="payment_container">
            <h1>
                Shopping Basket (<Link to="/checkout">{basket?.length} {!basket.length ? 'item' : 'items'}</Link>)
            </h1>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>

                <div className="payment_address">
                    <p>{userEmail?.email}</p>
                    <p>Address info</p>
                    <p>Address city</p>
                </div>
            </div>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map((item, index) => (<PaymentProduct
                        key={index}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        quantity={item.quantity}
                    />))}
                </div>
            </div>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className="payment_priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (<>
                                    <h3>Order Total: {value}</h3>
                                </>)}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                {processing ? <p>Processing</p> : 'Buy Now'}
                                </span>
                            </button>
                        </div>

                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>

        </div>
    </div>)
}

export default Payment;