import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { Header } from './components/Header';

// outermost div
const styles = {
  border: '1px solid blue',
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  margin: 'auto',
  height: '90%',
  width: '95%',
  minWidth: '480px',
  minHeight: '360px',
};

ReactDOM.render(
  (
    <div style={ styles }>
      <Header />
      <App />
    </div>
  ),
  document.getElementById('app')
);
