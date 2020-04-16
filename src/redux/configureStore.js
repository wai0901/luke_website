import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { InitialState } from './initialState';
import { Items } from './cartReducer';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            state: InitialState,
            items: Items
        }),
        applyMiddleware(thunk)
    );

    return store;
};