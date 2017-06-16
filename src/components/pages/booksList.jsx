"use strict"

import React from "react"; 
import {connect} from 'react-redux'; 
import {bindActionCreators} from "redux";
import {getBooks} from "../../actions/booksActions"; 
import {Carousel, Grid, Col, Row, Button} from "react-bootstrap"; 
import BookItem from "./bookItem.jsx";	
import BooksForm from "./booksForm.jsx";

import Cart from "./cart.jsx"; 		

class BooksList extends React.Component{

	componentDidMount(){
		this.props.	getBooks();
	}

	render(){		
		const bookList = this.props.books.map((booksArr) => {
			return(
				<Col xs={6} md={6} key={booksArr._id}>
					<BookItem 
						_id = {booksArr._id}
						title = {booksArr.title}
						description = {booksArr.description}
						images = {booksArr.images}
						price = {booksArr.price}
					/>
				</Col>
			)
		});

		return(
			<Grid>
					<Row>
						<Carousel>
						    <Carousel.Item>
						      <img width={900} height={500} alt="104x160" src="/images/img1.jpeg"/>
						      <Carousel.Caption>
						        <h3>First slide label</h3>
						        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						      </Carousel.Caption>
						    </Carousel.Item>
						    <Carousel.Item>
						      <img width={900} height={500} alt="900x500" src="/images/img2.jpeg"/>
						      <Carousel.Caption>
						        <h3>Second slide label</h3>
						        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						      </Carousel.Caption>
						    </Carousel.Item>
						    <Carousel.Item>
						      <img width={900} height={500} alt="900x500" src="/images/img3.jpg"/>
						      <Carousel.Caption>
						        <h3>Third slide label</h3>
						        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						      </Carousel.Caption>
						    </Carousel.Item>
						  </Carousel>					
					</Row>
					<Row>
						<Cart />
					</Row>
					<Row style={{marginTop: "15px"}}>
					{bookList}
				</Row>
			</Grid>
		)
	}

}

function mapStateToProps(state){
	return{
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks : getBooks
		}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList); 


