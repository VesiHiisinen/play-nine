import React, { Component } from 'react';

export default class Answer extends Component {

    render() {
        return(
            <div className="col-5">
            {this.props.selectedNumbers.map((number, i) => 
            <span key={i} onClick={() => this.props.unSelectNumber(number)}>{number}</span>)}
            </div>
        )
    }
}