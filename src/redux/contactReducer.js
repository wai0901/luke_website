import * as ActionTypes from './ActionTypes';


const contactState = {
    loading: false
}

export const ContactReducer = (state = contactState, action) => {

    switch(action.type) {
        case ActionTypes.POST_CONTACT:
            console.log(action.payload)
            return {
                ...state,
                loading: false
            }

        //for loading.
        case "LOADING":
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}