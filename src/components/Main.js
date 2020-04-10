import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import Items from './bodyComponets/SelectedCat/product_Items/Items';
import ItemDetail from './bodyComponets/SelectedCat/product_Items/ItemDetail';
import ShoppingCart from './bodyComponets/shopping_cart/ShoppingCart';
import { CSSTransition } from 'react-transition-group';
import { HOMEMENULIST } from '../shared/homeMenuList';
import { WOMENSECTIONLIST } from '../shared/womenSectionList';
import { MENSECTIONLIST } from '../shared/menSectionList';
import { GIRLSECTIONLIST } from '../shared/girlSectionList';
import { BOYSECTIONLIST } from '../shared/boySectionList';
import { BGIRLSECTIONLIST } from '../shared/bGirlSectionList';
import { BBOYSECTIONLIST } from '../shared/bBoySectionList';
import { MINISECTIONLIST } from '../shared/miniSectionList';
import { ASSCSECTIONLIST } from '../shared/asscSectionList';
import { PRODUCTS } from '../shared/itemsLists/products';
import './Main.css';



const Main = () => {

    // menu list
    const [homeSelection] = useState(HOMEMENULIST);

    //category list
    const [sectionLists] = useState([
        WOMENSECTIONLIST,
        MENSECTIONLIST, 
        GIRLSECTIONLIST, 
        BOYSECTIONLIST, 
        BGIRLSECTIONLIST, 
        BBOYSECTIONLIST, 
        MINISECTIONLIST, 
        ASSCSECTIONLIST
    ]);

    //items list
    const itemsLists = [PRODUCTS];

    //Shopping Cart
    const [cart, setCart] = useState([]);
    
    // total items in the cart
    const [cartNum, setCartNum] = useState(() => 
    Object.values(cart).reduce((total, {quantity}) => total + quantity, 0));
    
    // total price in the cart
    const [total, setTotal] = useState(0); 


    //Render Section - - - - V

    //Menu 
    const RenderMenu = ({match}) => {
        return (
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <SelectedCat 
                        selectedSection={sectionLists.filter(selectedList => 
                            selectedList[0].category === match.params.menuId && selectedList)}
                    />
            </CSSTransition>
        )
    }

    //Items page
    const RenderItems = ({match}) => {
        return (
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <Items 
                        itemsLists={itemsLists.filter(item => 
                            item[0].category === match.params.itemsId && item)}
                        addCart={addCart}
                    />
            </CSSTransition>
        )
    }


    //ItemDetail page 
    const RenderItemDetail = ({match}) => {
        return (
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <ItemDetail 
                        itemsLists={findItem(match.params.itemId, itemsLists)}
                        passItem={addCart}
                    />
                </CSSTransition>
        )
    }

    // - - - - - - - - - - - V - -data pass back to this section
    //Add items to cart
    const addCart = (e, size, qty, id) => {
        let fullItemData = (findItem(id, itemsLists)[0][0]);
        setCart(prevItem => {
            
            return [
                ...prevItem,
                {
                  size: size,
                  quantity: qty,
                  ...fullItemData
                }
              ]
            }
        )
        setCartNum(cartNum + qty);
        setTotal(total + (fullItemData.price * qty));
        e.preventDefault();
    }


    // function for find the item by id from the List
    const findItem = (id, list) => 
    list.map(items => 
        items.filter(item => 
            item.id === id && item
        )    
    )


    // function for calculate total price in the cart
    // function totalPrice(objs) {
    //     let num = 0;
    //     let totalNums = objs.map(function(obj){
    //         return num = obj.price * obj.quantity;
    //     })
    //     return totalNums.reduce((a, c) => a + c, 0);
    // }
    
    // function to adjust the qty from checkout page
    const changeQty = (event, id) => 
        updateArrObj(id, event, cart);
    
    function updateArrObj (cartId, event, objs) {
        let index = objs.findIndex(obj => obj.id === cartId);
        let {size, quantity, id, main, category, name, images, position, link, style, price, title, description} = objs[index];
        let curQtyNum = quantity;
        
        const remainObjs = (objs, id) => 
            objs.filter(obj => obj.id !== id && obj)

        let oldObjs = remainObjs(cart, id);
        
        event === "-1"? curQtyNum -= 1: curQtyNum += 1;
        return setCart(() => {
            return [
                ...oldObjs,
                objs[index] = {
                size: size,
                quantity: curQtyNum,
                id: id,
                main: main,
                category: category,
                name: name,
                images: images,
                position: position,
                link: link,
                style: style,
                price: price,
                title: title,
                description: description
            }
        ]
        })
    }


    // - - - - - - - - - - - ^ data pass back to above section

    
    return (
        <div className="bg">
            <div className="bg-shader"></div>
            <Router>
                <div className="container">
                    <Header cartNum={cartNum}/>
                    <div className="holder"> 
                        <Switch>                
                        <Route path="/" exact render={()=> {
                            return <BodySection home={homeSelection}/>
                        }} />
                        <Route path="/shopping-cart" exact render={()=> {
                            return <ShoppingCart 
                                cartItems={cart}
                                total={total}
                                changeQty={changeQty}
                                />
                        }} />
                        <Route path="/:menuId" exact component={RenderMenu} />
                        <Route path="/:menuId/:itemsId" exact component={RenderItems} /> 
                        <Route path="/:menuId/:itemsId/:itemId" exact component={RenderItemDetail} /> 
                        </Switch>                                  
                    </div>
                    <Footer />
                </div>
            </Router>
        </div>
    )
    
}


export default withRouter(Main);


