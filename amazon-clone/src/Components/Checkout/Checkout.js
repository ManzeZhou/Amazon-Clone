import './Checkout.css';
import Subtotal from "./Subtotal";
import {useSelector} from "react-redux";
import {CheckoutProduct} from "./CheckoutProduct";
import {useEffect} from "react";

function Checkout() {
    const basket = useSelector(state => state?.productReducer?.basket);

    useEffect(() => {
        console.log('basekt from cart',basket)
    }, [basket])
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="checkout-img"/>
                <div>
                    <h2 className="checkout_title">
                        Your shopping Basket
                    </h2>
                {/*    basket items*/}
                    {basket.map((item) => (<CheckoutProduct
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                        quantity={item.quantity}
                    />))}
                </div>

                <div className="checkout_right">
                    <Subtotal />
                </div>
            </div>
        </div>
    )
}

export default Checkout;