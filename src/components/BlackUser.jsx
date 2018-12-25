import React from 'react';
import style from '../styles/blackUser.css';

class BlackUser extends React.Component {
  constructor() {
    super();
    this.blackCheckers = [10,45,80,115,150,185,220,255,290,325,360,395,430,465];
  }
  state = {
    currentBlackChecker: undefined,
    homeBlacks: []
  }
  stepAhead = () => {
    if (this.props.whoseMove === 'black') {
      this.props.throwCube();
      this.chooseBlackCheckerFromHome(13);
      this.props.setWhoseMove('white');
    }
  }

  chooseBlackCheckerFromHome = () => {
    let checkers = document.querySelectorAll('.black.home');
    for (let i = 0; i < checkers.length; i++) {
      this.state.homeBlacks.push(checkers[i]);
      this.setState({homeBlacks: this.state.homeBlacks});
    }
    let lastIndex = (this.state.homeBlacks.length - 1);
    this.state.currentBlackChecker = this.state.homeBlacks[lastIndex];
    this.setState({currentBlackChecker: this.state.currentBlackChecker });
  }


  componentDidUpdate(){
    this.stepAhead();
  }

  render() {
    const blackCheckers = this.blackCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item +'px'}} className = 'black home' data-location = '0' data-line = {index} ></div>
    });
    return (
      <>
        {blackCheckers}
      </>
    );
  }
}

export default BlackUser
