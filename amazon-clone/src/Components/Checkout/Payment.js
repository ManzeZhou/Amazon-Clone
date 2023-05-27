import './Payment.css';
import {useDispatch, useSelector} from "react-redux";
import {CheckoutProduct} from "./CheckoutProduct";
import PaymentProduct from "./PaymentProduct";
import {Link, useNavigate} from "react-router-dom";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import {emptyBasket, emptyShippingInfo, storeUserInfo} from "../../actions/action";
import {db} from "../../firsebase";
import AddressAutocomplete from "./AddressAutocomplete";


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
    // const [clientSecret, setClientSecret] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);
    const [address, setAddress] = useState('');

    // address info
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
        console.log('basket --->', basket);
        console.log('THE SECRET IS --->', clientSecret);
    }, [basket, clientSecret])

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

            try {
                const response = await axios.post(`https://us-central1-v2-550c9.cloudfunctions.net/api/payments/create?total=${getBasketTotal(basket) * 100}`);
                setClientSecret(response.data.clientSecret);
            } catch (e) {
                console.log(e);
                setClientSecret(null);
            }

            // const response = await axios.post(`http://localhost:5001/v2-550c9/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`)
            // setClientSecret(response.data.clientSecret)
        };

        // run an async function inside useEffect
        setClientSecret(null);
        getClientSecret();
    }, [basket]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // first dispatch this and then send it to database, then empty delivery info in store

    dispatch(storeUserInfo(name, address, phoneNumber));


        if (clientSecret && typeof clientSecret === 'string') {

                if(name && phoneNumber && address) {
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
                                    created: paymentIntent.created,
                                    uName: name,
                                    uAddress: address,
                                    uPhoneNum: phoneNumber
                                });

                            setSucceeded(true);
                            setError(null);
                            setProcessing(false);

                            dispatch(emptyBasket());
                            // clear shipping info
                            dispatch(emptyShippingInfo());

                            navigate('/orders', {replace: true});
                        }
                    ).catch((err) => {
                        console.log(err);
                        setProcessing(false)
                    })
                } else {
                    alert('please complete the shipping information');
                    setProcessing(false);
                }


        } else {
            console.log('Invalid ClientSecret');
            setProcessing(false);
            navigate('/');
            alert('Sorry, something went wrong. Please try again.')
        }
    };


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
                    <div style={{display: "flex", flexDirection: 'column'}}>
                        <label
                            style={{marginBottom: '5px', fontWeight: "bold"}}
                            htmlFor="name">Name:</label>
                        <input
                            style={{
                                padding: '8px',
                                borderWidth: '1px',
                                border: 'solid',
                                borderColor: "lightgray",
                                borderRadius: '4px',
                                marginBottom: '10px'
                            }}
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <AddressAutocomplete setAddress={setAddress} address={address}/>

                    {/*<div style={{display: "flex", flexDirection: 'column'}}>*/}

                    {/*    <label htmlFor="address">Address:</label>*/}

                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        id="address"*/}
                    {/*        value={address}*/}
                    {/*        onChange={(e) => setAddress(e.target.value)}*/}
                    {/*    />*/}

                    {/*</div>*/}

                    <div style={{display: "flex", flexDirection: 'column'}}>
                        <label
                            style={{marginBottom: '5px', fontWeight: "bold"}}
                            htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            style={{
                                padding: '8px',
                                borderWidth: '1px',
                                border: 'solid',
                                borderColor: "lightgray",
                                borderRadius: '4px',
                                marginBottom: '10px'
                            }}
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

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
                                // onClick={handleBuyNow}
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