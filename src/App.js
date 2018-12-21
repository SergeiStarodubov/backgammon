import React from 'react';
import Dice from './components/Dice';
import Styles from './App.css';
import Field from './components/Field.jsx';

class App extends React.Component {
  constructor(){
    super();
    this.whiteCheckers = [565,530,495,460,425,390,355,320,285,250,215,180,145,110]; // location of checkers
    this.blackCheckers = [10,45,80,115,150,185,220,255,290,325,360,395,430,465];

  }
  state = {
    valueDice1: undefined,
    valueDice2: undefined,
    currentChecker: undefined,
    flag: true
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
    this.setState({valueDice1: a,valueDice2: b })
  }

  setFlag = () => { // using it in <Field/>
    this.state.flag = true;
    this.setState({flag: this.state.flag});
  }

  chooseChecker = (e) => {
    if (this.state.valueDice1 !== undefined || this.state.valueDice2 !== undefined) {
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
  }
  undefinedCurrentChecker = () => { //to set this.state.currentChecker is undefined
    this.state.currentChecker = undefined;
    this.setState({currentChecker: this.state.currentChecker});
  }

  render() {
    const whiteCheckers = this.whiteCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item +'px'}} className = 'white' onClick = {this.chooseChecker} data-location = '0' ></div>
    });
    const blackCheckers = this.blackCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item + 'px'}} className = 'black'></div>
    });

    return (
      <>
      <Dice getValue = {this.getValue}/>
      <Field currentChecker = {this.state.currentChecker} upUndefined = {this.undefinedCurrentChecker} dice1 = {this.state.valueDice1} dice2 = {this.state.valueDice2} setDiceUndefined = {this.setDiceUndefined} setFlag = {this.setFlag}/>
      {whiteCheckers}
      {blackCheckers}
      </>
    );
  }
}

export default App
