import './Payment.css';
import {useDispatch, useSelector} from "react-redux";
import {CheckoutProduct} from "./CheckoutProduct";
import PaymentProduct from "./PaymentProduct";
import {Link, useNavigate} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import {emptyBasket} from "../../actions/action";
import {db}  from "../../firsebase";


const Payment = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userEmail = useSelector(state => state?.productReducer?.user);
    const basket = useSelector(state => state?.productReducer?.basket);

    //use Stripe
    const stripe = useStripe();
    const elements = useElements();

    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);

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

    const cartQuantity = basket.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {

            //   const response = await axios({
            //     method: 'post',
            //     // Stripe expects the total in a currencies subunits
            //     url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            //   });
            //   setClientSecret(response.data.clientSecret)
            // }
            const response = await axios.post(`https://us-central1-v2-550c9.cloudfunctions.net/api/payments/create?total=${getBasketTotal(basket) * 100}`)
            setClientSecret(response.data.clientSecret)};

        // run an async function inside useEffect
        getClientSecret();
    }, [basket]);

    console.log('THE SECRET IS --->', clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // firebase cloud store
            db
                .collection('users')
                .doc(userEmail?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });

            setSucceeded(true);
            console.log('succeeded ---->',succeeded)
            setError(null);
            setProcessing(false);

            dispatch(emptyBasket());

            navigate('/orders', { replace: true });
            }
        )
    }


    return (<div className="payment">
        <div className="payment_container">
            <h1>
                Shopping Basket (<Link to="/checkout">{cartQuantity} {!basket.length ? 'item' : 'items'}</Link>)
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
                            <button
                                disabled={processing || disabled || succeeded}>
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