import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BodySection from './body components/BodySection';
import { HOMESELECTION } from '../shared/homeSelection';
import './Main.css';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeSelection: HOMESELECTION
        };
    }

    render () {
        return (
            <div className="bg">
                <div className="container">
                    <Header />
                    <BodySection home={this.state.homeSelection}/>
                    <Footer />
                </div>
            </div>
            
        )
    }
}


export default Main;