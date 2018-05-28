import React, { Component } from 'react';

export default class DoneFrame extends Component {
    render() {
        return(
            <div>
                <br />
                <h2>{this.props.doneStatus}</h2>
                <button 
                className="btn btn-secondary" 
                onClick={this.props.resetGame}>Play Again?</button>  
            </div>
        )
    }
}