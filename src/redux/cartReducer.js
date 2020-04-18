import * as ActionTypes from './ActionTypes';

const cartState = {
    cartNum: 0,
    cartTotal: 0,
    cart: [],
    loading: false
}


export const Items = (state = cartState, action) => {
    let cart = state.cart;
    let cartNum = state.cartNum;
    let cartTotal = state.cartTotal;
    let remainCarttotal = 0;

    switch(action.type) {
        case ActionTypes.FETCH_Add_CARTITEM:
            //new item added to the cart
            let newObj = {...action.payload}
            let foundItem = findItem(cart, newObj.productId);
            // to find the remain item
            let allItems = deleteItems(cart, newObj.productId);
            // to check if the new item is already in the cart, if yes, just update qty.
            if (foundItem) {
                foundItem.quantity = foundItem.quantity + newObj.quantity;
                allItems.push(foundItem);
            } else {
                allItems.push(newObj)
            }
            // to get the price and add to total
            let AddedCost = round((newObj.quantity * newObj.price) + cartTotal, 2);
            return {
                ...state,
                cartNum: cartNum + action.payload.quantity,
                cartTotal: AddedCost,
                cart: allItems,
                loading: false
            }
        
        case ActionTypes.FETCH_REMOVE_CARTITEM:
            let removedItem = findItem(cart, action.payload);
            let remainitems = deleteItems(cart, action.payload);
            //to remove the item total price from the cartTotal
            remainCarttotal = round(cartTotal - (removedItem.quantity * removedItem.price), 2);
            return {
                ...state,
                cartNum: cartNum - removedItem.quantity,
                cartTotal: remainCarttotal,
                cart: remainitems,
                loading: false
            }

        case ActionTypes.FETCH_INCREMENT_CARTITEM:
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
                cart: remainAddItems,
                loading: false
            }

        case ActionTypes.FETCH_DECREMENT_CARTITEM:
            // find the item and minus 1 to qty
            let findMinusItem = findItem(cart, action.payload);
            let remainMinusItems = ""
            // to check if the item's qty is 1, if yes, just remove the entire item.
            if(findMinusItem.quantity < 2) {
                cart.length < 2? remainMinusItems = []: remainMinusItems = deleteItems(cart, action.payload);
            } else {
                findMinusItem.quantity = findMinusItem.quantity - 1;
                // push the object list back to array
                remainMinusItems = deleteItems(cart, action.payload);
                remainMinusItems.push(findMinusItem);
            }
            // to minus the price from the cartTotal
            remainCarttotal = round(cartTotal - findMinusItem.price, 2);
            return {
                ...state,
                cartNum: cartNum - 1,
                cartTotal: remainCarttotal,
                cart: remainMinusItems,
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


const findItem = (items, inputItemId) => 
    items.find(item => item.productId === inputItemId && item);

const deleteItems = (items, inputItemId) =>
    items.filter(item => item.productId !== inputItemId && item);

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }


