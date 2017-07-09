import React from 'react';
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
      top: 0,
      left: 0,
      keydownLeft: false,
      keydownUp: false,
      keydownRight: false,
      keydownDown: false,
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
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  inputTick() {
    const v = 10;
    const dx = (this.state.keydownLeft && -v) + (this.state.keydownRight && v);
    const dy = (this.state.keydownUp && -v) + (this.state.keydownDown && v);

    this.setState({
      left: this.state.left + dx,
      top: this.state.top + dy,
    });
    //console.log('state: ' + JSON.stringify(this.state));
  }

  handleKeyDown(event) {
    switch (event.key) {
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
      <div style={ styles }>
        <Player top={ this.state.top } left={ this.state.left } />
      </div>
    );
  }
}
