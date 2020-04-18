import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import Items from './bodyComponets/SelectedCat/product_Items/Items';
import ItemDetail from './bodyComponets/SelectedCat/product_Items/ItemDetail';
import ShoppingCart from './bodyComponets/shopping_cart/ShoppingCart';
import Help from './bodyComponets/help/Help';
import Contact from './bodyComponets/contact/Contact';
import { postContact } from '../redux/ActionCreater';
import { CSSTransition } from 'react-transition-group';
import './Main.css';


const mapStateToProps = state => {
    return {
        homeMenuList: state.state.homeMenuList,
        womenSectionList: state.state.womenSectionList,
        menSectionList: state.state.menSectionList,
        girlSectionList: state.state.girlSectionList,
        boySectionList: state.state.boySectionList,
        bGirlSectionList: state.state.bGirlSectionList,
        bBoySectionList: state.state.bBoySectionList,
        miniSectionList: state.state.miniSectionList,
        asscSectionList: state.state.asscSectionList,
        products: state.state.products,
        cartItems: state.items.cart,
        helpContent: state.state.helpContent
    }
}

const mapDispatchToProps = {
    postContact: (values) => (postContact(values)),
  };

const Main = (props) => {

    // menu list
    const [homeSelection] = useState(props.homeMenuList);

    //category list
    const [sectionLists] = useState([
        props.womenSectionList,
        props.menSectionList, 
        props.girlSectionList, 
        props.boySectionList, 
        props.bGirlSectionList, 
        props.bBoySectionList, 
        props.miniSectionList, 
        props.asscSectionList
    ]);

    //items list
    const itemsLists = [props.products];


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
                            item.category === match.params.itemsId && item)}
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
                    />
                </CSSTransition>
        )
    }

    // function for find the item by id from the List
    const findItem = (id, list) => 
        Object.values(list[0]).filter(item => 
            item.id === id && item
        )    
    
    return (
        <div className="bg">
            <div className="bg-shader"></div>
            <Router>
                <div className="container">
                    <Header />
                    <div className="holder"> 
                        <Switch>                
                        <Route path="/" exact render={()=> 
                             <BodySection home={homeSelection}/>
                        } />
                        <Route path="/help" exact render={() => 
                            <Help helpContent={props.helpContent}/>
                        } />
                        <Route path="/contact" exact render={() => 
                            <Contact postContact={props.postContact}/> 
                        }/>
                        <Route path="/shopping-cart" exact  component={ShoppingCart} />
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


