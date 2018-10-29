import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
// import configureStore from './store/store';
import style from '../stylesheets/application.scss';

document.addEventListener("DOMContentLoaded", () => {
	// let store = configureStore();
	// window.getState = store.getState;
	const main = document.getElementById("main");
	ReactDOM.render(<App />, main);
});
