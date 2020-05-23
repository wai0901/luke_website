import * as ActionTypes from './ActionTypes';
import firebase from "../firebaseConfig";

const databaseRef = firebase.database();

//Fetch Data from server
export const fetchMainData = () => async dispatch => {
    dispatch(mainDataLoading());
    
    try {
        
        databaseRef.ref('homeMenu').on('value', snapshot => {
        dispatch(addMainData(snapshot.val()))})
    } catch(err) {
        dispatch(mainFailed(err));
    } 
};

export const mainDataLoading = () => ({
    type: ActionTypes.FETCH_MAIN_LOADING,
});

export const mainFailed = errMess => ({
    type: ActionTypes.FETCH_MAIN_FAILED,
    payload: errMess
});

export const addMainData = (mainData) => ({
    type: ActionTypes.FETCH_MAIN_DATA,
    payload: mainData
});




//Fetch select Id from menu
export const fetchCategoryData = (link) => async dispatch => {
    dispatch(categoryDataLoading());

    try {
        databaseRef.ref(link).on('value', snapshot => {
            dispatch(addCategoryData(snapshot.val()))})
    } catch(err) {
        dispatch(categoryFailed(err));
    } 
}

export const categoryFailed = errMess => ({
    type: ActionTypes.FETCH_CATEGORY_FAILED,
    payload: errMess
});

export const addCategoryData = (categoryData) => ({
    type: ActionTypes.FETCH_CATEGORY_DATA,
    payload: categoryData
});

export const categoryDataLoading = () => ({
    type: ActionTypes.FETCH_CATEGORY_LOADING,
});


//Fetch Items by the "link" from Category Component
export const fetchItemsData = (link) => async dispatch => {
    dispatch(ItemsDataLoading());

    try {
        databaseRef.ref(link).on('value', snapshot => {
            
            dispatch(addItemsData(snapshot.val()))})

    } catch(err) {
        dispatch(ItemsFailed(err));
    } 
}

export const ItemsFailed = errMess => ({
    type: ActionTypes.FETCH_ITEMS_FAILED,
    payload: errMess
});

export const addItemsData = (response) => ({
    type: ActionTypes.FETCH_ITEMS_DATA,
    payload: response
});

export const ItemsDataLoading = () => ({
    type: ActionTypes.FETCH_ITEMS_LOADING,
});


//Post to Server
export const postCartItems = (cartItem) => async dispatch => {
    dispatch(cartDataLoading());

    try {
        await databaseRef.ref('cartItems').push(cartItem)
            // .then(() => fetchCartData());
    } catch(err) {
        dispatch(cartFailed(err));
    }
}

//Update request
export const updateCartItems = (cartItem, id) => async dispatch => {
    dispatch(cartDataLoading());
   
    try {
        await databaseRef.ref('cartItems/' + id).set(cartItem)

    } catch(err) {
        dispatch(cartFailed(err));
    }
}

//delete request
export const removeCartItems = (id) => async dispatch => {
    dispatch(cartDataLoading());

    try {
        await databaseRef.ref('cartItems/' + id).remove()
       
    } catch(err) {
        dispatch(cartFailed(err));
    }
}

//get cart Data from server
export const fetchCartData = () => async dispatch => {
    dispatch(cartDataLoading());
    try {
        await databaseRef.ref('cartItems').on('value', snapshot => {
            let items = []
            snapshot.forEach(child => {
                items.push({
                    _key: child.key,
                    ...child.val()
                });
            })

        dispatch(addCartData(items))
        items = [];
        })

    } catch(err) {
        dispatch(cartFailed(err));
    } 
};

export const cartFailed = errMess => ({
    type: ActionTypes.FETCH_CART_FAILED,
    payload: errMess
});

export const addCartData = (response) => ({
    type: ActionTypes.FETCH_CART_DATA,
    payload: response
});

export const cartDataLoading = () => ({
    type: ActionTypes.FETCH_CART_LOADING,
});


