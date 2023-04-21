import './Product.css';
import {fetchProduct} from "../../actions/action";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


function Product({id, title, image, price, rating}) {

    const dispatch = useDispatch()

    const addToBasket = () => {
        dispatch(fetchProduct({id, title, image, price, rating}))

    };
    const basket = useSelector(state => state?.productReducer?.basket);
    useEffect(() => {
        console.log(basket)
    }, [basket])

    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((i, index) => <p key={index}>⭐</p>)}

                </div>
            </div>
            <img src={image} alt={title}/>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product;