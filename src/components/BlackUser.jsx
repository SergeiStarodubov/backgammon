import React from 'react';
import style from '../styles/blackUser.css';

class BlackUser extends React.Component {
  constructor() {
    super();
    this.blackCheckers = [10,45,80,115,150,185,220,255,290,325,360,395,430,465];
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
    currentBlackChecker: undefined,
    homeBlacks: []
  }

  stepAhead = () => {

  }


  render() {
    const blackCheckers = this.blackCheckers.map((item, index) => {
      return <div key = {index} style = {{top: item +'px'}} className = 'black house' data-location = '0'></div>
    });
    return (
      <>
        {blackCheckers}
      </>
    );
  }
}

export default BlackUser
