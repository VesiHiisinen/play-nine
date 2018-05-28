import React, { Component } from 'react';
import _range from 'underscore-es/range';
import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './FuncComp';

export default class Game extends Component {

    static randomNumber = () => {
        let randomInt = 1 + Math.floor(Math.random()*9);
        return randomInt;
    }

    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
    });

    state = Game.initialState();

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >=0) {
            return;
        }
        if (this.state.usedNumbers.indexOf(clickedNumber) >=0) {
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }))
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === 
            prevState.selectedNumbers.reduce((accumulator, n) => accumulator + n, 0)
        }));
    }

    acceptAnswer = () => {
        console.log("Answer accepted! Resetting game...");
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: null,
        }), this.updateDoneStatus);
        // TODO: refactor second setState call! It's asyncronous and won't 
        // work necessary
        this.setState({
           randomNumberOfStars: Game.randomNumber(), 
        });
    }

    reDraw = () => {
        if (this.state.redraws > 0) {
            this.setState(prevState => ({
                randomNumberOfStars: Game.randomNumber(),
                answerIsCorrect: null,
                selectedNumbers: [],
                redraws: prevState.redraws = prevState.redraws-1,
            }), this.updateDoneStatus);
        }
    }
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = _range(1, 10).filter(number => 
        usedNumbers.indexOf(number) === -1
        );
        return Game.possibleCombinationsSum(possibleNumbers, randomNumberOfStars);
    }

    // Does the array of possible numbers have any combination 
    // of numbers that sums up to equal the value of stars?
    static possibleCombinationsSum = function(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return Game.possibleCombinationsSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
      };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: "YOU'WE WON THE GAME! NICE!"};
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: "IT'S GAME OVER MAN, GAME OVER!"
                };
            }
        });
    }

    resetGame = ()  => {
        this.setState(Game.initialState());
    }

    render() {
        const {
            redraws, 
            usedNumbers,
            selectedNumbers, 
            randomNumberOfStars, 
            answerIsCorrect,
            doneStatus
        } = this.state;
        return(
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                <Stars numberOfStars={randomNumberOfStars} />
                <Button 
                redraws={redraws}
                selectedNumbers={selectedNumbers}
                checkAnswer={this.checkAnswer}
                answerIsCorrect={answerIsCorrect}
                acceptAnswer={this.acceptAnswer}
                reDraw={this.reDraw}/>
                <Answer 
                selectedNumbers={selectedNumbers}
                unSelectNumber={this.unSelectNumber} />
                </div>
                <br />
                {doneStatus ? 
                <DoneFrame 
                doneStatus={doneStatus}
                resetGame={this.resetGame} /> : //Don't mis it, sneaky ternary here!
                <Numbers 
                selectNumber={this.selectNumber}
                selectedNumbers={selectedNumbers}
                usedNumbers={usedNumbers}/>
                }
            </div>
        )
    }
}