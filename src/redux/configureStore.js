import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainPageReducer } from './mainPageReducer';
import { categoryReducer } from './categoryReducer';
import { itemsReducer } from './itemsReducer';
import { cartReducer } from './cartReducer'
// import { ContactReducer } from './contactReducer';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            mainPage: mainPageReducer,
            category: categoryReducer,
            items: itemsReducer,
            cartItem: cartReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
};