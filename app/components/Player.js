import React from 'react';

export function Player(props) {
  const styles = {
    background: 'black',
    width: props.width,
    height: props.height,
    position: 'absolute',
    top: props.top,
    left: props.left,
  };
  return (
    <div style={ styles } >
    </div>
  );
}
