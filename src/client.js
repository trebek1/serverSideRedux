"use strict"

import {createStore, applyMiddleware} from "redux"; 
import logger from "redux-logger"; 
import reducers from "./reducers/index";
import {addToCart} from "./actions/cartActions";
import {postBooks, deleteBooks, updateBooks} from "./actions/booksActions"; 

import React from "react"; 
import {render} from "react-dom";
import {Provider} from "react-redux";

import thunk from "redux-thunk";

//React Router 
import {Router, Route, IndexRoute, browserHistory} from "react-router"; 


// step 1 create the store 
const middleware = applyMiddleware(logger, thunk); 


// will pass initial state from server to store 
const initialState = window.INITIAL_STATE; 
const store = createStore(reducers, initialState, middleware);
import routes from "./routes"; 



const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
)

render(
	Routes, document.getElementById("app")
);	

