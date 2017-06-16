"use strict"
import axios from "axios"; 

export function getCart(){
	return function(dispatch){
		axios.get("/api/cart")
		.then(function(response){
			dispatch({type: "GET_CART", payload: response.data})
		})
		.catch(function(err){
			dispatch({type: "GET_CART_REJECTED", msg: "error with cart get "})
		})
	}
}

export function addToCart(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
		.then(function(response){
			dispatch({type: "ADD_TO_CART", payload: response.data})
		})
		.catch(function(err){
			dispatch({type: "ADD_TO_CART_REJECTED", msg: "error when adding to cart"})
		})
	}
}

export function deleteCartItem(cart){
	return function(dispatch){
		axios.post("/api/cart", cart)
		.then(function(response){
			dispatch({type: "DELETE_CART_ITEM", payload: response.data})
		})
		.catch(function(err){
			dispatch({type: "DELETE_CART_ITEM_REJECTED", msg: "error when deletingv from cart"})
		})
	}
}

export function updateCartItem(_id, unit, cart){
		const currentCart = cart;  
		const indexToUpdate = currentCart.findIndex((book) => book._id === _id);
		const newCart = {
			...currentCart[indexToUpdate], 
			quantity: currentCart[indexToUpdate].quantity + unit
		}
		const updateCart = [...currentCart.slice(0,indexToUpdate), newCart, ...currentCart.slice(indexToUpdate + 1)];
	return function(dispatch){
		axios.post("/api/cart", updateCart)
		.then(function(response){
			dispatch({type: "UPDATE_CART_ITEM", payload: response.data})
		})
		.catch(function(err){
			dispatch({type: "UPDATE_CART_REJECTED", msg: "error when adding to cart"})
		})
	}
}

