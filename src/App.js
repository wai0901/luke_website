import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import Main from "./components/Main";
import { configureStore } from './redux/configureStore';


const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Main />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;