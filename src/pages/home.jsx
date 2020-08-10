import React, { Component } from 'react';
import Cookies from 'universal-cookie';


class Home extends Component {
    state = {}
  
    render() {
      return (<h1>Home</h1>);
    }
  
    componentDidMount() {
      const cookies = new Cookies();
      console.log(cookies.get('token'));
    }
}

export default Home;