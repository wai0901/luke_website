import * as ActionTypes from './ActionTypes';

export const loading = () => {
    return {
        type: "LOADING"
    }
}

export const fetchAddCartItem = ({product, size, qty}) => async dispatch => {

    try {
        let id = product.productId.concat(size) 
        dispatch(loading())
        const response = await (product);

        //for stimulate the server delay
        setTimeout(() => {
            dispatch({
                type: ActionTypes.FETCH_Add_CARTITEM,
                payload: {
                    ...response,
                    productId: id,
                    size: size,
                    quantity: qty
                }   
            })
        }, 4000)
    } catch (err) {
        console.log('error loading data', err.toString());
    }
}

export const fetchRemoveCartItem = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch({
            type: ActionTypes.FETCH_REMOVE_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};

export const fetchIncrement = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch ({
            type: ActionTypes.FETCH_INCREMENT_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};

export const fetchDecrement = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch ({
            type: ActionTypes.FETCH_DECREMENT_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};


export const postContact = (values) => async dispatch => {

    try {
        dispatch(loading())
        const response = await (values);

        //set delay to stimuate the server delay
        setTimeout(() => {
        dispatch ({
            type: ActionTypes.POST_CONTACT,
            payload: response
        })
        }, 4000)

    } catch (err) {
        console.log('error loading data', err.toString());
    }
}

