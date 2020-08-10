import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Cookies from 'universal-cookie';


class NavigationBar extends Component {
    state = {  }

    logout() {
        const cookie = new Cookies();
        cookie.remove('token');
        window.location.reload(false);
    }

    getLoginOrLogoutLink() {
        const cookie = new Cookies();
        const token = cookie.get('token');
        console.log(token);

        let link;

        if(token === undefined) {
            link = (<li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>);
        }
        else {
            link = (<li className="nav-item"><Link to="/" onClick={() => this.logout()} className="nav-link">Logout</Link></li>);
        }

        return link;
    }

    render() { 
        let loginOrLogoutLink = this.getLoginOrLogoutLink();
        console.log(loginOrLogoutLink);

        return ( 
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">To Dos</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            {loginOrLogoutLink}
                            </ul>
                        </div>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default NavigationBar;