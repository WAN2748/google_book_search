import React, { useEffect, useState } from "react";
import Jumbotron from "../../componets/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../componets/Grid";
import { List, ListItem } from "../../componets/List";
import CardBody from "../../componets/CardBody/cardBody";
import Card from "../../componets/Card/card";
import DeleteBtn from "../../componets/DeleteBtn/deleteBtn"
import ViewBtn from "../../componets/ViewBtn/viewBtn"

function Search() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    API.getBooks()
    .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  }, [])

  function handleDeleteSubmit(id) {
    API.deleteBook(id)
    setBooks(books.filter((book) => {
        return book._id != id;
    }))
  }

    return (
      <Container fluid>
        <Row>
          <div className="hero">
            <Jumbotron>
              <h1>React Google Books Search</h1>
              <h5>Searched & Save Books of Interest</h5>
            </Jumbotron>
          </div>
          <Col size="md-12">
            <Card>
              {books.length >0? (
              <List> 
                {books.map(book => (
                  <ListItem key={book.id}>
                      <Card>
                      <DeleteBtn
                          handleDeleteSubmit={handleDeleteSubmit}
                          id={book._id}
                        />
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
              <p className="display-message text-center mt-5">Nothing Saved Yet</p>
            )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;