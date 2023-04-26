import React, {useState} from "react";
import "./CheckoutProduct.css";
import {useDispatch, useSelector} from "react-redux";
import {removeProduct, updateProductQuantity} from "../../actions/action";
// import {removeProduct} from "./action/action";

export const CheckoutProduct = ({id, image, title, price, rating,quantity, hideButton}) => {



    const dispatch = useDispatch();

    const [selectedQuantity, setSelectedQuantity] = useState(quantity);

    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1); // generate an array of 1 to 10 for quantity options

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setSelectedQuantity(newQuantity);
        dispatch(updateProductQuantity(id, newQuantity)); // dispatch an action to update product quantity in the Redux store
    };

    const removeFromBasket = () => {
        dispatch(removeProduct(id));
    }
    return(
        <div className="checkoutProduct">
            <img src={image} className="checkoutProduct_image" alt=""/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating).fill().map((i) =>
                        <p key={i}>⭐</p>
                    )}
                </div>
                <div>
                    <select value={selectedQuantity} onChange={handleQuantityChange}>
                        {quantityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>


                {/*{!hideButton && (*/}
                {/*    <button onClick={removeFromBasket}>Remove from basket</button>*/}
                {/*)}*/}
                <div className="checkoutProduct_info_btn">
                    <button onClick={removeFromBasket}>Remove from basket</button>
                </div>


            </div>
        </div>
    )
}