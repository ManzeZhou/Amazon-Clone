import {ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_USER, UPDATE_PRODUCT_QUANTITY} from "../consts/helper";

export const fetchProduct = (product) => {
    return {
        type: ADD_TO_BASKET,
        payload: product,
    }
};

export const updateProduct = (basket) => {
    return {
        type: ADD_TO_BASKET,
        payload: basket,
    }
};

export const updateProductQuantity = (id, quantity) => ({
    type: UPDATE_PRODUCT_QUANTITY,
    payload: { id, quantity },
});



export const removeProduct = (id) => {
    return {
        type:REMOVE_FROM_BASKET,
        payload:id,
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }}

export const emptyBasket = () => {
    return {
        type: EMPTY_BASKET,
    }
};

export const storeUserInfo = (name, address, phoneNumber) => ({
    type: 'STORE_USER_INFO',
    payload: { name, address, phoneNumber },
});

export const emptyShippingInfo = () => {
    return {
        type: 'EMPTY_SHIPPING_INFO',
    }
};
