import React from 'react';
import { Player } from './Player';

const styles = {
  border: '1px solid black',
  position: 'absolute',
  margin: 'auto',
  top: 0, bottom: 0,
  right: 0, left: 0,
  width: '100%',
  height: '100%',
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

  componentDidUpdate() {
    // setState here would cause infinite regression
    this.state.boundsWidth = document.getElementById('bounds').offsetWidth;
    this.state.boundsHeight = document.getElementById('bounds').offsetHeight;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  inputTick() {
    const velocity = 10;
    // Relies on this binding in constructor for inputTick
    const movement = this.calculateMovement(velocity);

    this.setState({
      playerLeft: this.state.playerLeft + movement.dx,
      playerTop: this.state.playerTop + movement.dy,
    });
  }

  calculateMovement(v) {
    // Get player dimensions
    const playerWidth = parseInt(this.state.playerWidth);
    const playerHeight = parseInt(this.state.playerHeight);

    // Find movement for this tick
    let dx = (this.state.keydownLeft && -v) + (this.state.keydownRight && v);
    let dy = (this.state.keydownUp && -v) + (this.state.keydownDown && v);

    // Check left and right bounds
    if (this.state.playerLeft + dx < 0) {
      dx = -this.state.playerLeft;
    } else if(this.state.playerLeft + playerWidth + dx > this.state.boundsWidth) {
      dx = this.state.boundsWidth - this.state.playerLeft - playerWidth;
    }
    // Check top and bottom bounds
    if (this.state.playerTop + dy < 0) {
      dy = -this.state.playerTop;
    } else if (this.state.playerTop + playerHeight + dy > this.state.boundsHeight) {
      dy = this.state.boundsHeight - this.state.playerTop - playerHeight;
    }
    return { dx: dx, dy: dy };
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
