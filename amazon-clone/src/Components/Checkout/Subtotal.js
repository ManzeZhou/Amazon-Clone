import './Subtotal.css';
import CurrencyFormat from "react-currency-format";

function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal (0 items) : <strong>0</strong>
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