import * as ActionTypes from './ActionTypes';


const contactState = {
    contactLoading: false
}

export const ContactReducer = (state = contactState, action) => {

    switch(action.type) {
        case ActionTypes.POST_CONTACT:
            console.log(action.payload)
            return {
                ...state,
                contactLoading: false
            }

        //for loading.
        case "CONTACTLOADING":
            return {
                ...state,
                contactLoading: true
            }

        default:
            return state;
    }
}