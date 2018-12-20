import React from 'react';
import Style from '../styles/Field.css';

class Field extends React.Component {
  constructor(){
    super();
    this.divs = [
      'cell1','cell2','cell3','cell4','cell5','cell6',
      'cell7','cell8','cell9','cell10','cell11','cell12',
      'blackHomeEnd',
      'cell13','cell14','cell15','cell16','cell17','cell18',
      'cell19','cell20','cell21','cell22','cell23','cell24',
      'whiteHomeEnd'
    ];
  }
  getCords = (e) => {
    const moveChecker = () => {
      const css = getComputedStyle(e.target);
      this.props.currentChecker.style.top = css.top;
      this.props.currentChecker.style.left = css.left;
      this.props.currentChecker.style.border = '';
      this.props.currentChecker.setAttribute ('data-location' , e.target.getAttribute('data-place'));
      this.props.upUndefined();
      this.props.setFlag()
    }
    if (this.props.currentChecker !== undefined) {
      let currentPosition = +this.props.currentChecker.getAttribute('data-location'),
      wantedPosition = +e.target.getAttribute('data-place');
      if ((wantedPosition - currentPosition) === (+this.props.dice1)) {
        moveChecker();
        this.props.setDiceUndefined('dice1');
      }
      if ((wantedPosition - currentPosition) === (+this.props.dice2))  {
        moveChecker();
        this.props.setDiceUndefined('dice2')
      }
    }
  }
  render() {
    const cells = this.divs.map((item, index) => {
      return <div id = {item} data-place = {(item === 'blackHomeEnd' || item === 'whiteHomeEnd')? null : item.substr(4)} key = {index} className = 'cells' onClick = {this.getCords}></div>;
    });
      return (
        <>
        {cells}
        </>
      );
  }
}

export default Field
