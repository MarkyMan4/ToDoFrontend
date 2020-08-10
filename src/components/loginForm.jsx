import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import {withRouter} from 'react-router';

const cookies = new Cookies();

class LoginForm extends Component {
    state = { 
        username: '',
        password: ''
    }

    handleUsernameInput = (event) => {
        this.setState({username: event.target.value});
    }

    handlePasswordInput = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/auth/', {
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                cookies.set('token', res.data.token, {path: '/'})

                // refresh the page so componentDidMount() gets called again, this time the
                // user will be logged in, so they will get redirected to the home page
                window.location.reload(false)
            })
            .catch(res => {
                console.log(res)
            });
    }

    render() { 
        return ( 
            <div className="row">
                <div className="col-md-4" />
                <div className="card shadow col-md-4 mt-5 pt-5 pb-5 text-center">
                    <h1 className="mb-4">Login</h1>
                    <hr />
                    <form>
                        <label>
                            <p className="mb-2"><b>Username:</b></p>
                            <input type="text" value={this.state.username} onChange={this.handleUsernameInput} />
                        </label>
                        <br />
                        <label className="mt-3">
                            <p className="mb-2"><b>Password:</b></p>
                            <input type="password" value={this.state.password} onChange={this.handlePasswordInput} />
                        </label>
                        <br />
                        <input className="mt-4 btn btn-outline-success" type="submit" value="Submit" onClick={this.handleSubmit} />
                    </form>
                </div>
            </div>
         );
    }

    // if user is already logged in, redirect them to home page
    componentDidMount() {
        if(cookies.get('token') != undefined) {
            this.props.history.push('/');
        }
    }
}

export default withRouter(LoginForm);