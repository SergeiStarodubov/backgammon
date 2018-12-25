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
    //===============================================
    const giveRightToMoveToBlackUser = () => {
      if (this.props.possibleMoves === 1) {
        this.props.setWhoseMove('black');
      }
    }
 //==================================================
 // function to clear areas needed to get stepped -------------
    const cleaner = () => {
      let allPlaces = document.querySelectorAll('.forstep');
      for (let i = 0; i < allPlaces.length; i++) {
        //coordinates current cell
        let [currentPlaceX, currentPlaceY] = [allPlaces[i].getBoundingClientRect().left, allPlaces[i].getBoundingClientRect().top],
        //coordinates down cell
            anyDownPlace = (document.elementFromPoint(currentPlaceX+5, currentPlaceY + 40).classList.contains('forstep')),
            anyDownCell = (document.elementFromPoint(currentPlaceX+5, currentPlaceY + 40).classList.contains('cells')),
            anyUpPlace = (document.elementFromPoint(currentPlaceX+5, currentPlaceY - 25).classList.contains('forstep')),
            anyUpCell = (document.elementFromPoint(currentPlaceX+5, currentPlaceY - 25).classList.contains('cells'));
        if (anyDownPlace || anyDownCell || anyUpCell || anyUpPlace) {
          const css = getComputedStyle(allPlaces[i]);
          //finding ccs top and left of the cell, and also its position attribute
          let [y,x] = [css.top.split(''), css.left.split('')];
          x.splice(-2,2);
          x = +x.join('');
          y.splice(-2,2);
          y = +y.join('');
          let position = allPlaces[i].getAttribute('data-place');
          //compare it with similar litaral in this.state.newPlaces. If it equals others one delete this.
          let tmp = [x,y,position];
          tmp = JSON.stringify(tmp);
          let index = this.state.newPlaces.indexOf(tmp);
          this.state.newPlaces.splice(index, 1);
          this.setState({newPlaces: this.state.newPlaces});
        }
      }
    } ///-------------------------------------------------------------------------------------

    // moving of the checker
    const moveChecker = () => {
      if (this.props.currentChecker.classList.contains('home')) this.props.setHome(false);
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
      (y > 300) ? y-= 35 : y+= 35; // depencing of where the cell is located
      let string = JSON.stringify([x,y,e.target.getAttribute('data-place')])
      this.state.newPlaces.push(string);
      this.setState({newPlaces: this.state.newPlaces});
      giveRightToMoveToBlackUser();
    }

    if (this.props.currentChecker !== undefined && this.props.dice1 !== this.props.dice2) {
      let currentPosition = +this.props.currentChecker.getAttribute('data-location'),
      wantedPosition = +e.target.getAttribute('data-place');
      if ((wantedPosition - currentPosition) === (+this.props.dice1)) {
        moveChecker();
        this.props.setDiceUndefined('dice1');
        this.props.deleteOneStep();
        cleaner();
      }
      if ((wantedPosition - currentPosition) === (+this.props.dice2))  {
        moveChecker();
        this.props.setDiceUndefined('dice2');
        this.props.deleteOneStep();
        cleaner();
      }

    } else if (this.props.currentChecker !== undefined && this.props.dice1 === this.props.dice2) { //if dices eaqual each other
      let currentPosition = +this.props.currentChecker.getAttribute('data-location'),
      wantedPosition = +e.target.getAttribute('data-place');
      if ((wantedPosition - currentPosition) === (+this.props.dice1)) {
        if (this.props.possibleMoves <= 0) {
          this.props.setDiceUndefined('dice1');
          this.props.setDiceUndefined('dice2');
          cleaner();
        } else {
          this.props.deleteOneStep();
          moveChecker();
          cleaner();
        }
      }
    }
  }

  render() {
    //to set cell-position for black user ===================
    let setPositionForBlackUser = () => {
      let i = 13;
      return () => {
        (i === 26) ? i = 1 : i = i;
        return i++;
      }
    }
    let setNumber = setPositionForBlackUser();
    // ======================================================
    const cells = this.divs.map((item, index) => {
      return <div id = {item} data-place = {(item === 'blackHomeEnd')? null :(item === 'whiteHomeEnd')? '25' : item.substr(4)} key = {index} className = 'cells' onClick = {this.startMove} data-placeblack = {(item === 'whiteHomeEnd')? null : setNumber()}></div>;
    });
    const newPlaces = this.state.newPlaces.map((block, index) => {
      block = JSON.parse(block);
      return <div className = 'cells forstep' key = {index} style = {{left: block[0], top: block[1]}} onClick = {this.startMove} data-place = {block[2]} ></div>
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
