import React, { Component } from 'react';

class ToDo extends Component {
    state = { 
        name: this.props.name,
        description: this.props.description,
        startDate: this.props.startDate,
        endDate: this.props.endDate
    }

    render() { 
        return (
            <div>
                <h5>{this.state.name}</h5>
                <p>{this.state.description}</p>
                <p>{this.state.startDate}</p>
                <p>{this.state.endDate}</p>
            </div>
        );
    }
}
 
export default ToDo;