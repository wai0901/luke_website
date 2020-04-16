import * as ActionTypes from './ActionTypes';
// import { PRODUCTS } from '../shared/itemsLists/products';

const cartState = {
    cartNum: 0,
    cartTotal: 0,
    cart: []
}


export const Items = (state = cartState, action) => {
    let cart = state.cart;
    let cartNum = state.cartNum;
    let cartTotal = state.cartTotal;
    let remainCarttotal = 0;
    // console.log(cart)
    switch(action.type) {
        case ActionTypes.Add_CARTITEM:
            let newObj = {...action.payload}
            let foundItem = findItem(cart, newObj.productId);
            let allItems = deleteItems(cart, newObj.productId);
            if (foundItem) {
                foundItem.quantity = foundItem.quantity + newObj.quantity;
                allItems.push(foundItem);
            } else {
                allItems.push(newObj)
            }
            let AddedCost = round((newObj.quantity * newObj.price) + cartTotal, 2);
            return {
                ...state,
                cartNum: cartNum + action.payload.quantity,
                cartTotal: AddedCost,
                cart: allItems
            }
        
        case ActionTypes.REMOVE_CARTITEM:
            let removedItem = findItem(cart, action.payload);
            let remainitems = deleteItems(cart, action.payload);
            remainCarttotal = round(cartTotal - (removedItem.quantity * removedItem.price), 2);
            return {
                ...state,
                cartNum: cartNum - removedItem.quantity,
                cartTotal: remainCarttotal,
                cart: remainitems
            }

        case ActionTypes.INCREMENT_CARTITEM:
            // find the item and add 1 to qty
            let findAddItem = findItem(cart, action.payload);
            findAddItem.quantity = findAddItem.quantity + 1;
            // push the object list back to array
            let remainAddItems = deleteItems(cart, action.payload);
            remainAddItems.push(findAddItem);
            remainCarttotal = round(cartTotal + findAddItem.price, 2);
            return {
                ...state,
                cartNum: cartNum + 1,
                cartTotal: remainCarttotal,
                cart: remainAddItems
            }

        case ActionTypes.DECREMENT_CARTITEM:
            // find the item and minus 1 to qty
            let findMinusItem = findItem(cart, action.payload);
            let remainMinusItems = ""
            if(findMinusItem.quantity < 2) {
                cart.length < 2? remainMinusItems = []: remainMinusItems = deleteItems(cart, action.payload);
            } else {
                findMinusItem.quantity = findMinusItem.quantity - 1;
                // push the object list back to array
                remainMinusItems = deleteItems(cart, action.payload);
                remainMinusItems.push(findMinusItem);
            }
            remainCarttotal = round(cartTotal - findMinusItem.price, 2);
            return {
                ...state,
                cartNum: cartNum - 1,
                cartTotal: remainCarttotal,
                cart: remainMinusItems
            }

        case ActionTypes.GET_CARTITEM:
            return {...state}
            

        default:
            return state;
    }
}


const findItem = (items, inputItemId) => 
    items.find(item => item.productId === inputItemId && item);

const deleteItems = (items, inputItemId) =>
    items.filter(item => item.productId !== inputItemId && item);

// const addItemTotal = (cartTotal, inputItem) => {
//     return round((inputItem.quantity * inputItem.price) + cartTotal)
// }

const findCartTotal = (items) => {
    let cost = items.map(item => item.quantity * item.price);
    let total = cost.reduce((total, item) => total + item, 0);
    return total.toFixed(2)
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

// const priceAdjuster = (cartTotal, operator, inputItem) => {
//     cartTotal + inputItem.price

// }

