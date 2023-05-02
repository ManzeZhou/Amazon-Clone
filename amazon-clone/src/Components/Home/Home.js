import './Home.css'
import Product from "../Products/Product";
import {useEffect, useState} from "react";
function Home() {


    const homeImageArr = [
        'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg',
        'https://m.media-amazon.com/images/I/71S89QP39cL._SX3000_.jpg',
        'https://m.media-amazon.com/images/G/15/digital/video/merch/2022/Other/MLP_BG_right_1440x675.jpg',
        'https://m.media-amazon.com/images/I/616o+HHx74L._SX3000_.jpg',
        ' https://m.media-amazon.com/images/I/61z8amIOraL._SX3000_.jpg',
        'https://m.media-amazon.com/images/I/81qa7iF0B5L._SX3000_.png',
        'https://m.media-amazon.com/images/I/71Wffj7MKwL._SX3000_.jpg'
    ];

    const [index, setIndex] = useState(0);

    const showPic = () => {
        if(index === homeImageArr.length -1) {
            return setIndex(0)
        }
        return setIndex(index+1)
    };

    useEffect(() => {
        const interval = setInterval(() => {showPic()}, 2000)
        return () => {clearInterval(interval)}
    });

    return (
        <div className="home">
            <div className="home_container">
                <img
                    className="home_image"
                    src={homeImageArr[index]}
                    alt="background pic"
                />

                <div className="home_row">
                    <Product
                        id="12321341"
                        title='The lean start up: How Constant Innovation Creates Radically Successful Businesses Paperback'
                        price={29.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                        rating={5}/>
                    <Product
                        id="49538094"
                        title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                        price={239.0}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                    />
                </div>

                <div className="home_row">
                    <Product
                        id="4903850"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                        price={199.99}
                        rating={3}
                        image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                    />
                    <Product
                        id="23445930"
                        title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99}
                        rating={5}
                        image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                    />
                    <Product
                        id="3254354345"
                        title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                        price={598.99}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                    />
                </div>

                <div className="home_row">
                    <Product
                        id="90829332"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                        price={1094.98}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />
                </div>

            </div>
        </div>
    )
}

export default Home;