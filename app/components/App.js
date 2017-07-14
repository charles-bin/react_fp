import React from 'react';
import ReactDOM from 'react-dom';
import { Player } from './Player';

const styles = {
  border: '1px solid black',
  position: 'absolute',
  margin: 'auto',
  top: 0, right: 0, bottom: 0, left: 0,
  width: '90%',
  height: '80%',
};

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputTick = this.inputTick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.state = {
      playerTop: 0,
      playerLeft: 0,
      playerWidth: "100px",
      playerHeight: "100px",
      keydownLeft: false,
      keydownUp: false,
      keydownRight: false,
      keydownDown: false,
      boundsWidth: null,
      boundsHeight: null,
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.inputTick(),
      10
    );
    this.setState({
      boundsWidth: document.getElementById('bounds').offsetWidth,
      boundsHeight: document.getElementById('bounds').offsetHeight,
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  inputTick() {
    const v = 10;
    const playerWidth = parseInt(this.state.playerWidth);
    const playerHeight = parseInt(this.state.playerHeight);

    let dx = (this.state.keydownLeft && -v) + (this.state.keydownRight && v);
    let dy = (this.state.keydownUp && -v) + (this.state.keydownDown && v);

    if (this.state.playerLeft + dx < 0) {
      dx = -this.state.playerLeft;
    } else if(this.state.playerLeft + playerWidth + dx > this.state.boundsWidth) {
      dx = this.state.boundsWidth - this.state.playerLeft - playerWidth;
    }

    if (this.state.playerTop + dy < 0) {
      dy = -this.state.playerTop;
    } else if (this.state.playerTop + playerHeight + dy > this.state.boundsHeight) {
      dy = this.state.boundsHeight - this.state.playerTop - playerHeight;
    }

    this.setState({
      playerLeft: this.state.playerLeft + dx,
      playerTop: this.state.playerTop + dy,
    });
    //console.log('state: ' + JSON.stringify(this.state));
  }

  handleKeyDown(event) {
    switch (event.key) {
      // debug case
      case 't':
        console.log("state: " + JSON.stringify(this.state));
        break;
      case 'a':
        if(!this.state.keydownLeft) {
          this.setState({ keydownLeft: true });
        }
        break;
      case 'w':
        if(!this.state.keydownUp) {
          this.setState({ keydownUp: true });
        }
        break;
      case 'd':
        if(!this.state.keydownRight) {
          this.setState({ keydownRight: true });
        }
        break;
      case 's':
        if(!this.state.keydownDown) {
          this.setState({ keydownDown: true });
        }
        break;
    }
    //console.log("handleKeyDown: " + event.key);
  }

  handleKeyUp(event) {
    switch (event.key) {
      case 'a':
        this.setState({ keydownLeft: false });
        break;
      case 'w':
        this.setState({ keydownUp: false });
        break;
      case 'd':
        this.setState({ keydownRight: false });
        break;
      case 's':
        this.setState({ keydownDown: false });
        break;
    }
    //console.log("handleKeyUp: " + event.key);
  }

  render() {
    return (
      <div id="bounds" style={ styles }>
        <Player
          top={ this.state.playerTop }
          left={ this.state.playerLeft }
          width={ this.state.playerWidth }
          height={ this.state.playerHeight }
        />
      </div>
    );
  }
}
