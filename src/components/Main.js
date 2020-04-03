import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import Items from './bodyComponets/SelectedCat/product_Items/Items';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { HOMEMENULIST } from '../shared/homeMenuList';
import { WOMENSECTIONLIST } from '../shared/womenSectionList';
import { MENSECTIONLIST } from '../shared/menSectionList';
import { GIRLSECTIONLIST } from '../shared/girlSectionList';
import { BOYSECTIONLIST } from '../shared/boySectionList';
import { BGIRLSECTIONLIST } from '../shared/bGirlSectionList';
import { BBOYSECTIONLIST } from '../shared/bBoySectionList';
import { MINISECTIONLIST } from '../shared/miniSectionList';
import { ASSCSECTIONLIST } from '../shared/asscSectionList';
import { WBESTSELLERSLIST } from '../shared/itemsLists/best_sellers';
import { WLOUNGEWEAR } from '../shared/itemsLists/loungewear';
import './Main.css';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeSelection: HOMEMENULIST,
            sectionLists: [WOMENSECTIONLIST, 
                MENSECTIONLIST, 
                GIRLSECTIONLIST, 
                BOYSECTIONLIST, 
                BGIRLSECTIONLIST, 
                BBOYSECTIONLIST, 
                MINISECTIONLIST, 
                ASSCSECTIONLIST
            ],
            itemsLists: [WBESTSELLERSLIST, WLOUNGEWEAR]
            // fadeInOut: false
        };
    }


    render () {
        
        const RenderMenu = ({match}) => {
            return (
                <SelectedCat 
                    selectedSection={this.state.sectionLists.filter(selectedList => {
                    if (selectedList[0].category === match.params.menuId) {
                        // console.log(selectedList)
                        return selectedList
                    }} )}
                    // fade={setFadeInOut(toggleFadeInOut)}
                />
            )
        }

        const RenderItems = ({match}) => {
            return (
                <Items 
                    itemsLists={this.state.itemsLists.filter(item => {
                    if (item[0].category === match.params.itemsId) {
                        return item
                    }} )}
                />
            )
        }

        
        

        // const setFadeInOut = () => {
        //     this.setState({fadeInOut: !this.state.fadeInOut})
        // }

        return (
            <div className="bg">
                <Router>
                    <div className="container">
                        <Header />
                            {/* <CSSTransition in={fadeInOut} 
                                        timeout={300}
                                        classNames="fade"
                                        > */}
                                    <Switch>
                                        <Route path="/" exact render={()=> {
                                            return (<BodySection home={this.state.homeSelection}/>)
                                        }} />
                                        <Route path="/:menuId" exact component={RenderMenu} />
                                        <Route path="/:menuId/:itemsId" exact component={RenderItems} />
                                    </Switch>
                            {/* </CSSTransition> */}
                        <Footer />
                    </div>
                </Router>
            </div>
            
        )
    }
}


export default Main;