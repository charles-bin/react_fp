import React from 'react';

const headStyle = {
  position: 'absolute',
  margin: 'auto',
  border: '1px solid gray',
  textAlign: 'center',
  width: '100%',
};

export function Header(props) {
  return (
    <h1 style={ headStyle }>A Box Simulation</h1>
  );
}
