import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { InitialState } from './initialState';
import { Items } from './cartReducer';
import { ContactReducer } from './contactReducer';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            state: InitialState,
            items: Items,
            contact: ContactReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
};