import React from 'react';
import Dice from './components/Dice';
import Styles from './App.css';
import Field from './components/Field.jsx';

class App extends React.Component {
  state = {
    valueDice1: undefined,
    valueDice2: undefined
  }
  getValue =(a,b) => {
    this.state.valueDice1 = a;
    this.state.valueDice2 = b;
    this.setState({valueDice1: a,valueDice2: b })
  }
  render() {
    return (
      <>
      <Dice getValue = {this.getValue}/>
      <Field/>
      </>
    );
  }
}

export default App
