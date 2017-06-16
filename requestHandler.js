import axios from "axios"; 
import React from "react"; 
import {createStore} from "redux"; 
import {Provider} from "react-redux"; 
import {renderToString} from "react-dom/server"; 
import {match, RouterContext} from "react-router"; 

import reducers from "./src/reducers/index"; 
import routes from "./src/routes"; 

function handleRender(req,res){
	axios.get("http://localhost:3001/books")
	.then(function(response){
			// var myHtml = JSON.stringify(response.data); 
			// res.render("index", {myHtml})
			// create a redux store on the server 
		const store = createStore(reducers, {"books": {"books": response.data}}); 


			// get initial state from the server 
			// this regex should mitigate people injecting scripts from front end 
			const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,
				'<\\/script').replace(/<!--/g, '<\\!--');

		// implement react router to intercept client requests 
		const Routes = {
			routes: routes, 
			location: req.url
		}

		match(Routes, function(error, redirect, props){
			if(error){
				res.status(500).send("error fulfilling the request ");
			}else if(redirect){
				res.status(302, redirect.pathname + redirect.search)
			}else if(props){
				const reactComponent = renderToString(
					<Provider store={store}>
						<RouterContext {...props}/>
					</Provider>
				)
				res.status(200).render("index", {reactComponent, initialState})
			}else{
				res.status(404).send("Not Found"); 
			}
		})

	})
	.catch(function(err){
		console.log("initial server render failed");
	})	
};


module.exports = handleRender; 