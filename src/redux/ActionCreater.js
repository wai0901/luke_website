import * as ActionTypes from './ActionTypes';

export const loading = () => {
    return {
        type: "LOADING"
    }
}

export const addCartItem = (item, size, qty) => async dispatch => {
    try {
        let id = item.productId.concat(size) 
        dispatch(loading())
        const response = await (item);

        //for stimulate the server delay
        setTimeout(() => {
            dispatch({
                type: ActionTypes.Add_CARTITEM,
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

export const removeCartItem = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch({
            type: ActionTypes.REMOVE_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};

export const increment = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch ({
            type: ActionTypes.INCREMENT_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};

export const decrement = (itemId) => async dispatch => {
    try {
        dispatch(loading())
        const response = await (itemId);

        dispatch ({
            type: ActionTypes.DECREMENT_CARTITEM,
            payload: response
        })
    } catch (err) {
        console.log('error loading data', err.toString());
    }
};


