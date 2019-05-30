import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/js/dist/modal';
import { Route, NavLink, BrowserRouter as Router, Switch } from "react-router-dom";
import Register from"./register"
import Login from "./login"
import App from './index'
import Userlist from './userlist'



class Home extends Component {
    constructor(props) {

        super(props)
    }
    render() {

        return (
            <header className="App-header">
    
      <div>
      <Router>
        <div>
          <div>
            <div >
                <ul className="header">
                  <li><NavLink exact to="/">Home</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
                  <li><NavLink to="/register">Registration</NavLink></li>
                  <li><NavLink to="/userlist">User List</NavLink></li>
                </ul>
                <Switch>
                  <Route exact path="/" component={App}/>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/userlist" component={Userlist} />
                </Switch>
            </div>
          </div>
        </div>
      </Router>
      </div>
            </header>
        )
    }
}
export default Home