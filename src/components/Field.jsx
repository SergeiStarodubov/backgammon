import React from 'react';
import Style from '../styles/Field.css';
import ReactDOM from 'react-dom';

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
  state = {
    newPlaces: []
  }
  startMove = (e) => {
    const cleaner = () => {
      let allPlaces = document.querySelectorAll('.place');
      for (let i = 0; i < allPlaces.length; i++) {
        let [currentPlaceX, currentPlaceY] = [allPlaces[i].getBoundingClientRect().left, allPlaces[i].getBoundingClientRect().top];
        if (document.elementFromPoint(currentPlaceX+5, currentPlaceY + 40).classList.contains('place')) {
          const css = getComputedStyle(allPlaces[i]);
          let [y,x] = [css.top.split(''), css.left.split('')];
          x.splice(-2,2);
          x = +x.join('');
          y.splice(-2,2);
          y = +y.join('');
          let position = allPlaces[i].getAttribute('data-place');
          let com = [x,y,position];
          com = JSON.stringify(com);
          let index = this.state.newPlaces.indexOf(com);
          this.state.newPlaces.splice(index, 1);
          this.setState({newPlaces: this.state.newPlaces});
        }
      }
    }
    const moveChecker = () => {
      // moving of the checker
      const css = getComputedStyle(e.target);
      this.props.currentChecker.style.top = css.top;
      this.props.currentChecker.style.left = css.left;
      this.props.currentChecker.style.border = '';
      this.props.currentChecker.setAttribute ('data-location' , e.target.getAttribute('data-place'));
      this.props.upUndefined();
      this.props.setFlag();
      //and add new place top to move
      let [y,x] = [css.top.split(''), css.left.split('')];
      x.splice(-2,2);
      x = +x.join('');
      y.splice(-2,2);
      y = +y.join('');
      y-= 35;
      let string = JSON.stringify([x,y,e.target.getAttribute('data-place')])
      this.state.newPlaces.push(string);
      this.setState({newPlaces: this.state.newPlaces});
    }

    if (this.props.currentChecker !== undefined) {
      let currentPosition = +this.props.currentChecker.getAttribute('data-location'),
      wantedPosition = +e.target.getAttribute('data-place');
      if ((wantedPosition - currentPosition) === (+this.props.dice1)) {
        moveChecker();
        this.props.setDiceUndefined('dice1');
        cleaner();
      }
      if ((wantedPosition - currentPosition) === (+this.props.dice2))  {
        moveChecker();
        this.props.setDiceUndefined('dice2');
        cleaner();
      }
    }
  }
  render() {
    const cells = this.divs.map((item, index) => {
      return <div id = {item} data-place = {(item === 'blackHomeEnd' || item === 'whiteHomeEnd')? null : item.substr(4)} key = {index} className = 'cells' onClick = {this.startMove}></div>;
    });
    const newPlaces = this.state.newPlaces.map((block, index) => {
      block = JSON.parse(block);
      return <div className = 'cells place' key = {index} style = {{left: block[0], top: block[1]}} onClick = {this.startMove} data-place = {block[2]}></div>
    });
      return (
        <>
        {cells}
        {newPlaces}
        </>
      );
  }
}

export default Field
