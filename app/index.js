import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

alert("i'm rendering from index.js");
alert(App.toString());

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
