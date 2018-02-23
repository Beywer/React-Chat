import React, {Component} from 'react';
import Welcome from "./Welcome.jsx";
import Clock from "./Clock";
import List from "./List";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <hr/>
                <Welcome>, today is a good day to die!</Welcome>
                <hr/>
                <Clock/>
                <List/>
            </div>
        );
    }
}

export default App;
