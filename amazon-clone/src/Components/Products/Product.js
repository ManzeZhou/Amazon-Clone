import './Product.css';
import {fetchProduct, updateProduct} from "../../actions/action";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Popup from "./Popup";


function Product({id, title, image, price, rating}) {

    const dispatch = useDispatch();

    const basket = useSelector(state => state?.productReducer?.basket);

    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        console.log('basket from store', basket)
    }, [basket]);

    const addToBasket = () => {
        const productInBasket = basket.find((item) => item.id === id);
        if (productInBasket && productInBasket.quantity >= 10) {
            alert("You can only have a maximum of 10 of this item in your cart.");
            return;
        }
        const quantity = 1;
        dispatch(fetchProduct({id, title, image, price, rating, quantity}));
        setShowPopup(true);
    };





    return (
        <>
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
                <button className="product_btn" onClick={addToBasket}>Add to Basket</button>
            </div>
            {showPopup && <Popup title={title} image={image} price={price} onClose={() => setShowPopup(false)} visible={showPopup}/>}

        </>
    )
}

export default Product;