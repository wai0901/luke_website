import * as ActionTypes from './ActionTypes';

export const loading = () => {
    return {
        type: "LOADING"
    }
}

export const addCartItemAsnc = (item, size, qty) => {
    let id = item.productId.concat(size) 
    
    return  {
        type: ActionTypes.Add_CARTITEM,
        payload: {
            ...item,
            productId: id,
            size: size,
            quantity: qty
        }   
    }
}

export const addCartItem = (item, size, qty) => {
    
    return dispach => {
        dispach(loading())
        setTimeout(() => {
            dispach(addCartItemAsnc(item, size, qty));
        }, 4000)
    }
}

export const removeCartItem = (itemId) => {

    return {
        type: ActionTypes.REMOVE_CARTITEM,
        payload: itemId
    }
};

export const increment = (itemId) => {

    return {
        type: ActionTypes.INCREMENT_CARTITEM,
        payload: itemId
    }
};

export const decrement = (itemId) => {

    return {
        type: ActionTypes.DECREMENT_CARTITEM,
        payload: itemId
    }
};

export const getCartItem = () => ({
    type: ActionTypes.GET_CARTITEM
})

