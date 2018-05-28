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

    state = {
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
    }

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
        }));
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
            }));
        }
    }
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = _range(1, 10).filter(number => 
        usedNumbers.indexOf(number) === -1
    );
    // Does the array of possible numbers have any combination of numbers that sum up to equal the value of stars?
}
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: "YOU'WE WON THE GAME! NICE!"};
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: "IT'S GAME OVER MAN, GAME OVER!"};
            }
        })
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
                <DoneFrame doneStatus={doneStatus} /> : //sneaky ternary statement here
                <Numbers 
                selectNumber={this.selectNumber}
                selectedNumbers={selectedNumbers}
                usedNumbers={usedNumbers}/>
                }
            </div>
        )
    }
}