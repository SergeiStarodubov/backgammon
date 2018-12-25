import React from 'react';
import style from '../styles/dice.css';
import BlackUser from './BlackUser.jsx';

class Dice extends React.Component {
  constructor() {
    super();
    this.throwButton = React.createRef();
    this.cube = {
      '1': '0px 0px',
      '2': '-53px 0px',
      '3': '-106px 0px',
      '4': '0 50.5px',
      '5': '-53px 50.5px',
      '6': '-106px 50.5px'
    };
  }

  state = {
    positionFirstDice: '0px 0px',
    positionSecondDice: '0px 0px',
    valueFirstDice: undefined,
    valueSecondDice: undefined,
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  throwCube = () => {
    let timer = (s) => {
      setTimeout(() => {
         this.state.positionFirstDice = this.cube[this.randomNumber(1,7)];
         this.setState({positionFirstDice: this.state.positionFirstDice});
         this.state.positionSecondDice = this.cube[this.randomNumber(1,7)];
         this.setState({positionSecondDice: this.state.positionSecondDice});

      },s);
    };
    let promise = () => {
      return new Promise ((solve) => {
        timer(100);
        solve();
      });
    };
    promise()
      .then(() => timer(150))
      .then(() => timer(150))
      .then(() => timer(100))
      .then(() => timer(100))
      .then(() => timer(200))
      .then(() => {
        setTimeout(() => {
          for (let key in this.cube) {
            if (this.cube[key] === this.state.positionFirstDice) {
              this.state.valueFirstDice = key;
              this.setState({valueFirstDice: key});
            }
            if (this.cube[key] === this.state.positionSecondDice) {
              this.state.valueSecondDice = key;
              this.setState({valueSecondDice: key});
            }
          }
          this.props.getValue(this.state.valueFirstDice, this.state.valueSecondDice);
          if (this.state.valueFirstDice === this.state.valueSecondDice) this.props.setMoving(4);
          else this.props.setMoving(2);
          this.props.setHome(true);
        }, 500)
      });
  }

  render() {
    return (
      <>
        <div className ='dices' style = {{backgroundPosition: this.state.positionFirstDice}}></div>
        <div className ='dices' style = {{backgroundPosition: this.state.positionSecondDice}}></div>
        <p><button id = 'throw' ref = {this.throwButton} onClick = {this.throwCube} disabled = {this.props.moving()}>throw dices</button></p>
        <p><button id = 'skip'>skip move</button></p>
        <BlackUser
          whoseMove = {this.props.whoseMove}
          setWhoseMove = {this.props.setWhoseMove}
        />
      </>
    );
  }
}

export default Dice
