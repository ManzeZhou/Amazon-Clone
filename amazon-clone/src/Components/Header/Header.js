import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {auth} from "../../firsebase";

function Header() {
    const basket = useSelector(state => state?.productReducer?.basket);
    const userEmail = useSelector(state => state?.productReducer?.user);

    const handleAuth = () => {
        if (userEmail) {
            auth.signOut();
        }
    }

    // const cartQuantity = basket?.length;

    const cartQuantity = basket.reduce((acc, item) => {
        return acc + item.quantity
    }, 0);


    return (
        <div className="header">
            <Link to='/'>
                <img className="header_logo"
                     src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo"/>
            </Link>


            <div className="header_search">
                <input className="header_searchInput" type="text"/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_nav">
                <Link to={userEmail ? null : '/login'}>
                    <div
                        onClick={handleAuth}
                        className="header_option">
                        <span className="header_optionLineOne">Hello {userEmail ?  `${userEmail.email}` : 'Guest'}</span>
                        <span className="header_optionLineTwo">{userEmail  ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <Link to='/orders' style={{color: 'white', textDecoration:'none'}}><span className="header_optionLineTwo">& Orders</span></Link>
                </div>


                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header_optionLineTwo header__basketCount">
                           {cartQuantity}
                    </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;