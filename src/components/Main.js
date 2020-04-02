import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import { HOMEMENULIST } from '../shared/homeMenuList';
import { SALESSECTIONLIST } from '../shared/salesSectionList';
import { WOMENSECTIONLIST } from '../shared/womenSectionList';
import './Main.css';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeSelection: HOMEMENULIST,
            sectionLists: [SALESSECTIONLIST, WOMENSECTIONLIST]
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
                />
            )
        }

        return (
            <div className="bg">
                <Router>
                    <div className="container">
                        <Header />
                        <Switch>
                            <Route path="/" exact render={()=> {
                                return (<BodySection home={this.state.homeSelection}/>)
                            }} />
                            <Route path="/:menuId" exact component={RenderMenu} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
            
        )
    }
}


export default Main;