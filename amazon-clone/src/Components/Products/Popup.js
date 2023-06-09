import React from 'react';
import './Popup.css';
import {Link} from "react-router-dom";

function Popup({title, price, image, visible, onClose}) {
    return (
        <>
            {visible && (
                <div className="popup">
                    <div className="popup-container">
                        <button className="close-btn" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                        <div className="popup-content">
                            <h2>{title} is now added to your cart!</h2>
                            <img src={image} alt={title}/>
                            <p className="price">$ {price}</p>
                            <Link to='/checkout'>
                                <button className="checkout-btn">Proceed to checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;





