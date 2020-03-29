import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './Main.css';

class Main extends Component {

    render () {
        return (
            <div className="bg">
                <div className="container">
                    <Header />
                    <div className="body-container">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="women"></div>
                        <div className="men"></div>
                        <div className="five"></div>
                        <div className="six"></div>
                        <div className="girl"></div>
                        <div className="boy"></div>
                        <div className="assc"></div>
                    </div>
                    <Footer />
                </div>
            </div>
            
        )
    }
}

export default Main;