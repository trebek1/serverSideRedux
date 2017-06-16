"use strict"

import React from "react"; 
import {render} from "react-dom";
//React Router 
import {Router, Route, IndexRoute, browserHistory} from "react-router"; 

import BooksList from "./components/pages/BooksList.jsx"; 
import Menu from "./components/menu.jsx";
import Footer from "./components/footer.jsx";
import Cart from "./components/pages/cart.jsx";	
import BooksForm from "./components/pages/booksForm.jsx";	
import Main from "./main.jsx";


const routes = (
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList}/>
				<Route path="/admin" component={BooksForm}/> 
				<Route path="/cart" component={Cart}/>
			</Route>
		</Router>
);

export default routes; 