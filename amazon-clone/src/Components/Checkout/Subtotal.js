import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import {useSelector} from "react-redux";

function Subtotal() {

    const basket = useSelector(state => state?.productReducer?.basket)
    //calculate the subtotal price
    let initialPrice = 0
    let subPrice = basket?.reduce(function (prev, curr){
        return prev + curr.price
    }, initialPrice)

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items) : <strong>0</strong>
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
                // value={subPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;