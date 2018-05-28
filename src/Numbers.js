import React, { Component } from 'react';
import _range from 'underscore-es/range';

export default class Numbers extends Component {

    arrayOfNumbers = _range(1,10);
    gimmeKey = () => {
        let uniqueKey = 1+ Math.floor(Math.random()*10000000);
        return uniqueKey;
    }

    numberClassName = (number) => {
        if (this.props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (this.props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    }

    render() {
        return(
            <div className="card text-center">
                <div>
                    {this.arrayOfNumbers.map((number, i) => 
                    <span 
                    key={this.gimmeKey()} 
                    onClick={ () => this.props.selectNumber(number)} 
                    className={this.numberClassName(number)}>{number}</span>)}
                </div>
            </div>
        )
    }
}