import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

/*
There is rarely a need to change this file, it injects our React into
the DOM so that it is displayed. Strict mode is automatically added when you
create a React app and it is advised to leave it on. On occasion you may want
to turn it off but it is best left on generally!

On the live website we import our TailwindCSS styles in here:
https://github.com/Grey-College-Web-Committee/grey-shop/blob/master/frontend/src/index.js
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
