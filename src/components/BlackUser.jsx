import React from 'react';
import style from '../styles/blackUser.css';

class BlackUser extends React.Component {
  constructor() {
    super();
    this.blackCheckers = [10,45,80,115,150,185,220,255,290,325,360,395,430,465];
  }
  stepAhead =() => {
    if (this.props.whoseMove === 'black') {
      console.log('hello');
      this.props.setWhoseMove('white');
    }
  }
  componentDidUpdate(){
    this.stepAhead();
  }
  
  render() {
    const blackCheckers = this.blackCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item +'px'}} className = 'black home' data-location = '0' ></div>
    });
    return (
      <>
        {blackCheckers}
      </>
    );
  }
}

export default BlackUser
