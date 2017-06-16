// step 3 define reducers 

export function booksReducers(state = {
	books: []
}, action){
	switch(action.type){
		case "GET_BOOKS": 
		return {...state, books:[...action.payload]	}
		break; 
		case "INCREMENT": 
		return state + action.payload; 
		break;
		case "DECREMENT": 
		return state - action.payload; 
		break;
		case "POST_BOOK":
		let books = [...state.books, ...action.payload]
		return {...state, books: [...state.books, ...action.payload], msg: "Saved! Click to continue", style: "success", validation: "success"}
		break; 
		case "POST_BOOK_REJECTED":
		return {...state, msg: "Please, try again", style: "danger", validation: "error"}
		break; 
		case "RESET_BUTTON":
		return {...state, msg: null, style: "primary", validation: null}
		break;
		case "DELETE_BOOK":
		// create a copy of the current array 
		const currentBookToDelete = [...state.books]; 
		// determine wich index in array is book to be delete 
		const indexToDelete = currentBookToDelete.findIndex((book) => book._id == action.payload); 
		let books2 = [...currentBookToDelete.slice(0,indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)];
		
		return Object.assign({}, state, {books: books2});
		break;

		case "UPDATE_BOOK": 
		const currentBookToUpdate = [...state.books]; 
		const indexToUpdate = currentBookToUpdate.findIndex((book) => book._id === action.payload._id);
		const newBookToUpdate = {
			...currentBookToUpdate[indexToUpdate], 
			title: action.payload.title,
			description: action.payload.description	
		}
		const updateBooks = [...currentBookToUpdate.slice(0,indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];
		return Object.assign({}, state, {books: updateBooks});
		break;
	}
	
	return state; 
}





