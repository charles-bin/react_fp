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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      top: 10,
      left: 10,
    };
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    switch (event.keyCode) {
      case 37:
        this.setState({ left: this.state.left -= 20 });
        break;
      case 38:
        this.setState({ top: this.state.top -= 20 });
        break;
      case 39:
        this.setState({ left: this.state.left += 20 });
        break;
      case 40:
        this.setState({ top: this.state.top += 20 });
        break;
    }
    //console.log("handleKeyPress: " + event.keyCode);
    //console.log("top: " + this.state.top + " --- left: " + this.state.left);
  }

  render() {
    return (
      <div style={ styles }>
        <Player top={ this.state.top } left={ this.state.left } />
      </div>
    );
  }
}
