import React from 'react';

export class Player extends React.Component {
  render() {
    const styles = {
      background: 'black',
      width: '100px',
      height: '100px',
      position: 'absolute',
      top: this.props.top,
      left: this.props.left,
    };
    return (
      <div style={ styles } >
      </div>
    );
  }
}
