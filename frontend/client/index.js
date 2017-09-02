/*
    ./client/index.js
    which is the webpack entry file
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import '../semantic/dist/semantic.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

console.log('Hey guys and ladies!!')
