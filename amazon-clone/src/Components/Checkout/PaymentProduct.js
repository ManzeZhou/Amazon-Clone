import React, {useEffect, useState} from "react";
import "./CheckoutProduct.css";
import {useDispatch, useSelector} from "react-redux";
import {removeProduct, updateProductQuantity} from "../../actions/action";

import './PyamentProduct.css';


export const PaymentProduct = ({id, image, title, price, rating,quantity}) => {




    return(
        <div className="checkoutProduct">
            <img src={image} className="checkoutProduct_image" alt=""/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{(parseFloat(price)).toFixed(2).replace(/\.?0+$/, '')}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating).fill().map((i, index) =>
                        <p key={index}>⭐</p>
                    )}
                </div>
                <div>
                    <h4>Quantity: {quantity}</h4>
                </div>



            </div>
        </div>
    )
}

export default PaymentProduct;