

const initialState = {

    name: '',
    address: '',
    phoneNumber: '',

};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_USER_INFO':
            return {
                ...state,

                    name: action.payload.name,
                    address: action.payload.address,
                    phoneNumber: action.payload.phoneNumber,

            };

        case 'EMPTY_SHIPPING_INFO':
            return {
                name: '',
                address: '',
                phoneNumber: '',
            };
        default:
            return state;
    }
};

export default addressReducer;