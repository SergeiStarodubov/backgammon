import React from 'react';
import Img from '../src/images/dice.jpg';
import style from './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.cube = {
      1: '0px 0px',
      2: '-53px 0px',
      3: '-106px 0px',
      4: '0 50.5px',
      5: '-53px 50.5px',
      6: '-106px 50.5px'
    };
  }

  state = {
    position: '0px 0px'
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  throwCube = () => {

    let timer = (s) => {
      setTimeout(() => {
         this.state.position = this.cube[this.randomNumber(1,7)];
         this.setState({position: this.state.position});
      },s);
    };

    let promise = () => {
      return new Promise ((solve) => {
        timer(600)
        solve();
      });
    };

    promise()
      .then(() => timer(800))
      .then(() => timer(1200))
      .then(() => timer(1500))
      .then(() => timer(1800))
      .then(() => timer(2100));
  }

  render() {

    return (
      <>
        <div id ='first' style = {{backgroundPosition: this.state.position}} onClick = {this.throwCube}></div>
      </>
    );
  }
}

export default App
