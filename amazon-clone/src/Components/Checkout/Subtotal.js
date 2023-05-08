import './Subtotal.css';
import {useSelector} from "react-redux";
import CurrencyFormat from "react-currency-format";
import {useNavigate} from "react-router-dom";

function Subtotal() {

    const navigate = useNavigate();

    const basket = useSelector(state => state?.productReducer?.basket)
    //calculate the subtotal price
    let initialPrice = 0;
    const subPrice = basket?.reduce((acc, item) => {
        return acc + item.quantity * item.price;
    }, initialPrice);

    const cartQuantity = basket.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cartQuantity} items) : <strong>{value}</strong>
                            {/*Subtotal ({basket?.length} {!basket.length ? 'item' : 'items'}):*/}
                            {/*<strong>*/}
                            {/*    {value}*/}
                            {/*</strong>*/}
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox"/> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={subPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />


                {/*<p>*/}
                {/*    Subtotal ({cartQuantity} items) : <strong>${subPrice}</strong>*/}
                {/*</p>*/}
                {/*<small className="subtotal_gift">*/}
                {/*    <input type="checkbox"/> This order contains a gift*/}
                {/*</small>*/}



            <button
                onClick={() => {
                    if(!cartQuantity) {
                        alert('Your Cart is Empty')
                    } else {
                        navigate('/payment')
                    }
                }}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;