import {CheckoutProduct} from "../Checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import './Order.css';
import moment from "moment";
import PaymentProduct from "../Checkout/PaymentProduct";
import {Link} from "react-router-dom";
import {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



const Order = ({order}) => {

    console.log('data from cloud ---。',order.data);

    const [show, setShow] = useState(false);


    return <div className="order">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMMM D YYYY, h:mma')}</p>

        <p className="order_id">
            <small>{order.id}</small>
        </p>
        {order.data.basket?.map((item, index) => (
            <PaymentProduct
                key={index}
                id = {item.id}
                title = {item.title}
                image = {item.image}
                price = {item.price}
                rating = {item.rating}
                quantity={item.quantity}
            />
        ))}


            <div>
                <a
                    className="shipping_info_btn"
                    onClick={() => setShow(!show)}>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        <h3>Shipping Information</h3> {show ? <RemoveIcon /> : <AddIcon />}
                    </div>
                </a>


                <div style={{display: show ? 'block' : 'none', marginTop:'10px'}}>
                    <p><strong>Name</strong>: {order.data.uName ? order.data.uName : null}</p>
                    <p><strong>Address</strong>: {order.data.uAddress ? order.data.uAddress : null}</p>
                    <p><strong>Phone Number</strong>: {order.data.uPhoneNum ? order.data.uPhoneNum : null}</p>
                </div>

            </div>



        <CurrencyFormat
            renderText={(value) => (

                <h3 className="order_total">Order Total: {value}</h3>

            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
    </div>
}

export default Order;