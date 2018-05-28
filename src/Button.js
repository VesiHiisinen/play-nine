import React, { Component } from 'react';

export default class Button extends Component {

    render() {

        let button;

        switch (this.props.answerIsCorrect) {
            case true:
            button =
            <button className="btn btn-success" onClick={this.props.acceptAnswer}>
                <i className="fa fa-check"></i>
            </button>
            console.log(`Your answer is ${this.props.answerIsCorrect}`);
                break;

            case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>
            console.log(`Your answer is ${this.props.answerIsCorrect}`);
                break;
        
            default:
            button = 
            <button 
            onClick={this.props.checkAnswer}
            className="btn" 
            disabled={this.props.selectedNumbers.length === 0}>=</button>
                break;
        }
     
        return(
            <div className="col-2">
            {button}
            <br /><br />
            <button 
            className="btn btn-warning btn-sm" 
            onClick={this.props.reDraw}
            disabled={this.props.redraws === 0}>
                <i className="fa fa-sync"> {this.props.redraws}</i>
            </button>
            </div>
        )
    }
}

// How about making a class which holds stateless function objets as static methods?