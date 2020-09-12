import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ToDo from '../components/todo';

const cookies = new Cookies();

class Home extends Component {
    state = {
      todos: []
    }

    get_home_content = () => {
      let content;

      if(cookies.get('token') === undefined) {
        content = <h1>Login to view this content</h1>;
      }
      else {
        let todos = this.state.todos;

        if(todos.length === 0) {
          content = <h1>No todos available</h1>;
        }
        else {
          content = (
          <div className="m-5">
            {todos.map(todo => <ToDo key={todo.id} name={todo.name} description={todo.description}
                                      startDate={todo.start_date} endDate={todo.end_date}/>)}
          </div>);
        }
      }

      return content;
    }
  
    render() {
      return this.get_home_content();
    }
  
    componentDidMount() {
      if(cookies.get('token') !== undefined) {
        axios.get('http://localhost:8000/api/todos/?completed=false', {
          headers: {'Authorization': 'Token ' + cookies.get('token')}
        })
        .then(res => {
          this.setState({todos: res.data});
        });
      }
    }
}

export default Home;