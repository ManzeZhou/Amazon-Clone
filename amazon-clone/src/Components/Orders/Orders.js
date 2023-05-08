import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import './Oders.css';
import {db} from '../../firsebase';
import Order from "./Order";
import {Link, useNavigate} from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();

    const userEmail = useSelector(state => state?.productReducer?.user)

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // only if user exists
        if (userEmail) {
            db
                .collection('users')
                .doc(userEmail?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        } else {
            setOrders([])
        }

    }, [userEmail])

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            {userEmail ?
                <div className="orders_order">
                    {orders.length === 0 ?  <h3>You have no orders <button className="orders_btn" onClick={() => navigate('/')}>Continue to Shopping</button></h3>: orders?.map((order, index) => (
                        <Order order={order} key={index}/>
                    ))}
                </div> :
                <div className="orders_order">

                    <h2><Link to='/login' style={{textDecoration: 'none', color: '#a88734'}}>Sign In</Link> to Review Order History</h2>

                </div>
            }


        </div>
    )
}

export default Orders;