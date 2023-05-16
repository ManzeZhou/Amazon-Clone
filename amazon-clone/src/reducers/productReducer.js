import {ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_USER, UPDATE_PRODUCT_QUANTITY} from "../consts/helper";

const productInitialState = {
    basket: [],
    user: null,
}

export const productReducer = (state = productInitialState, action) => {
    switch (action?.type) {


        case ADD_TO_BASKET:
            const { id, title, image, price, rating, quantity } = action.payload;
            const existingProductIndex = state.basket.findIndex(product => product.id === id);
            if (existingProductIndex !== -1) {
                let newBasket = [...state.basket];
                // console.log('newBasket',newBasket)
                newBasket[existingProductIndex].quantity += quantity; // update quantity of existing product
                return { ...state, basket: [...newBasket] };
                // state.basket[existingProductIndex].quantity += quantity; // update quantity of existing product
                // return { ...state };
            }
            const newProduct = { id, title, image, price, rating, quantity };
            return { ...state, basket: [...state.basket, newProduct] };


        case UPDATE_PRODUCT_QUANTITY:
            // const { id, quantity } = action.payload;
            const productId = action.payload.id;
            const productQty = action.payload.quantity;
            const updatedBasket = state.basket.map((item) => {
                if (item.id === productId) {
                    // console.log('productQty:',productQty);
                    // console.log('price', item.price)

                    return {
                        ...item,
                        quantity: productQty,
                        // price: parseInt(item.price) * parseInt(productQty) // Calculate new price based on quantity
                    };
                }
                return item;
            });
            return {
                ...state,
                basket: updatedBasket
            };



        case EMPTY_BASKET:
            return {
                ...state, basket: []
            };


        case REMOVE_FROM_BASKET:

            // find the product that needs to be removed
            const index = state?.basket?.findIndex(
                (basketItem) => basketItem.id === action.payload);
            // console.log(index)
            let newBasket = [...state.basket]
            //remove the index
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product id:${action.id} as its not in the basket`
                )
            }
            return {
                ...state, basket: newBasket
            }

        case SET_USER :

            return {
                ...state,
                user: action?.payload
            }


        default:
            return state
    }

}