import React, { useState } from "react";
import Jumbotron from "../../componets/Jumbotron";
import API from "../../utils/API";
import CardBody from "../../componets/CardBody/cardBody";
import Card from "../../componets/Card/card"
import SaveBtn from "../../componets/SaveBtn/saveBtn"
import ViewBtn from "../../componets/ViewBtn/viewBtn"
import { Col, Row, Container } from "../../componets/Grid/index";
import { List, ListItem } from "../../componets/List";
import { Input, FormBtn } from "../../componets/Form/form";

import "../Search/style.css"

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooksByTitle(searchTerm)
      .then(res => {
        setBooks(res)
        }
      )
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setSearchTerm( value.replace(/\s/g, '') );
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchTerm) {
      loadBooks();
    }
  };
  
  function handleSaveSubmit(bookData) {
    API.saveBook({
      _id : bookData.id,
      title: bookData.title,
      authors: bookData.authors,
      description: bookData.description,
      image: bookData.image,
      link: bookData.link
    })
  };

    return (
      <Container fluid>
        <Row>
          <div className="hero">
            <Jumbotron>
              <h1>Google Book Search</h1>
              <h5>Uses Google Books API</h5>
            </Jumbotron>
          </div>
          <Col size="md-12">
            <form className="d-flex">
              <Input
                onChange={handleInputChange}
                name="title"
                style={{ textAlign: "center", backgroundColor: "rgb(232,240,254)" }}
                placeholder='Ex: "Lord of the Rings"'
              />
              <FormBtn
                style={{ textAlign: "center", backgroundColor: "rgb(232,240,254)" }}
                onClick={handleSearchSubmit}
              >
                <i className="fas fa-search"></i>
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <Card>
              <h4 className="text-center">Search Results</h4>
              {books.length >0? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                      <Card>
                      <SaveBtn
                          handleSaveSubmit={handleSaveSubmit}
                          bookData={book}
                        >
                          <i className="far fa-heart"></i>
                        </SaveBtn>
                        <ViewBtn
                          link={book.link}
                        />
                        <CardBody
                          key={book.id}
                          title={book.title}
                          authors={book.authors}
                          image={book.image}
                          description={book.description}
                        />
                      </Card>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="display-message text-center mt-5">No Results to Display</p>
            )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;