import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './body components/BodySection';
import SelectedCat from './body components/SelectedCat components/SelectedCat';
import { HOMEMENULIST } from '../shared/homeMenuList';
import { WOMENSECTIONLIST } from '../shared/womenSectionList';
import './Main.css';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeSelection: HOMEMENULIST,
            sectionLists: [WOMENSECTIONLIST]
        };
    }

    render () {

        const RenderMenu = ({match}) => {
            return (
                <SelectedCat 
                    selectedSection={this.state.sectionLists.map(selectedList => {
                    if (selectedList[0].category === match.params.menuId) {
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