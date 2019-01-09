import React from 'react';
import Dice from './components/Dice';
import Styles from './App.css';
import Field from './components/Field.jsx';


class App extends React.Component {
  constructor(){
    super();
    this.whiteCheckers = [565,530,495,460,425,390,355,320,285,250,215,180,145,110]; // location of checkers
  }

  state = {
    valueDice1: undefined,
    valueDice2: undefined,
    currentChecker: undefined,
    flag: true, // to choose a checker in current time
    possibleMoves: -1,
    home: true, //if it is true you can take from the home, else you cannot
    whoseMove: 'white'
  }

  setDiceUndefined = (dice) => {
    if (dice === 'dice1') {
      this.state.valueDice1 = undefined;
      this.setState({valueDice1: this.state.valueDice1});
    }
    if (dice === 'dice2') {
      this.state.valueDice2 = undefined;
      this.setState({valueDice2: this.state.valueDice2});
    }
  }
  getValue =(a,b) => { // to get the of dices in the component <Dice/>
    this.state.valueDice1 = a;
    this.state.valueDice2 = b;
    this.setState({valueDice1: a, valueDice2: b})
  }

  setFlag = () => { // using it in <Field/>
    this.state.flag = true;
    this.setState({flag: this.state.flag});
  }
  setHome = (bool) => {
    if (bool === false) this.state.currentChecker.classList.remove('home');
    this.state.home = bool;
    this.setState({home: bool});
  }

  chooseChecker = (e) => {
    let pushChecker =() => {
      if (this.state.flag === true) {
        let allWhiteCheckers = document.querySelectorAll('.white');
        allWhiteCheckers.forEach((checker) => {checker.style.border = ''});
        e.target.style.border = '1px solid white';
        this.state.currentChecker = e.target;
        this.setState({currentChecker: this.state.currentChecker});
        this.state.flag = false;
        this.setState({flag: this.state.flag});
      } else if (this.state.flag === false) {
        e.target.style.border = '';
        this.undefinedCurrentChecker();
        this.setFlag();
      }
    }
    if ((this.state.valueDice1 !== undefined || this.state.valueDice2 !== undefined) && this.state.possibleMoves > 0) {
      if (this.state.home === true && e.target.classList.contains('home')) {
        pushChecker();
      } else if (!e.target.classList.contains('home')){
        pushChecker();
      }
    }
  }

  undefinedCurrentChecker = () => { //to set this.state.currentChecker is undefined
    this.state.currentChecker = undefined;
    this.setState({currentChecker: this.state.currentChecker});
  }
//the group is to handle #throw -> button.disabled -----------------
  moving = () => {
    if (+this.state.possibleMoves <= 0) return false;
    else return true;
  }
  deleteOneStep = () => {
    this.state.possibleMoves--;
    this.setState({possibleMoves: this.state.possibleMoves});
  }
  setMoving = num => {
    this.state.possibleMoves = Number(num);
    this.setState({possibleMoves: this.state.possibleMoves});
  }
// ----------------------------------------------------------------
  setWhoseMove = user => {
    (user === 'white') ? this.setState({whoseMove: 'white'}) : this.setState({whoseMove: 'black'});
  }

  render() {
    const whiteCheckers = this.whiteCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item +'px'}} className = 'white home' onClick = {this.chooseChecker} data-location = '0' ></div>
    });
    return (
      <>
      <Dice
      moving = {this.moving}
      setMoving = {this.setMoving}
      getValue = {this.getValue}
      setHome = {this.setHome}
      whoseMove = {this.state.whoseMove}
      setWhoseMove = {this.setWhoseMove}
      possibleMoves = {this.state.possibleMoves}
      />
      <Field
      currentChecker = {this.state.currentChecker}
      upUndefined = {this.undefinedCurrentChecker}
      dice1 = {this.state.valueDice1}
      dice2 = {this.state.valueDice2}
      setDiceUndefined = {this.setDiceUndefined}
      setFlag = {this.setFlag}
      deleteOneStep = {this.deleteOneStep}
      possibleMoves = {this.state.possibleMoves}
      setHome = {this.setHome}
      setWhoseMove = {this.setWhoseMove}
      whoseMove = {this.state.whoseMove}
      />
      {whiteCheckers}
      </>
    );
  }
}

export default App
