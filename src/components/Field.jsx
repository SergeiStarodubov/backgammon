import React from 'react';
import Style from '../styles/Field.css';

class Field extends React.Component {
  constructor(){
    super();
    this.divs = [
      'whiteHomeStart',
      'cell1','cell2','cell3','cell4','cell5','cell6',
      'cell7','cell8','cell9','cell10','cell11','cell12',
      'blackHomeEnd',
      'blackHomeStart',
      'cell13','cell14','cell15','cell16','cell17','cell18',
      'cell19','cell20','cell21','cell22','cell23','cell24',
      'whiteHomeEnd'
    ];
  }
  render() {
    const cells = this.divs.map((item, index) => {
      return <div id = {item} key = {index} className = 'cells'></div>;
    });
      return (
        <>
        {cells}
        </>
      );
  }
}

export default Field
