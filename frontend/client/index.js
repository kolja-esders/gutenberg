/*
    ./client/index.js
    which is the webpack entry file
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import '../semantic/dist/semantic.min.css';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
