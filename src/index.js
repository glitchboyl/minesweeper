import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from "styled-components";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    position: relative;
  }

  body {
    font-family: sans-serif;
    color: #333333;
    -webkit-text-size-adjust: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: #2DB4D8;
    text-decoration: none;
    transition: color .3s;
  }

  a:hover {
    color: #22BAD9;
  }

  #app {
    height: 100%;
    text-align: center;
    position: relative;
  }
`;

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();