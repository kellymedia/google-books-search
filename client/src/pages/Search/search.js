import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/Jumbotron/jumbotron";
import API from "../../utils/api";
import CardBody from "../../components/cardBody/cardBody";
import Card from "../../components/Card/card";
import SaveBtn from "../../components/saveBtn/saveBtn";
import ViewBtn from "../../components/viewBtn/viewBtn";
import { Col, Row, Container } from "../../components/Grid/grid";
import { List, ListItem } from "../../components/List/list";
import { Input, FormBtn } from "../../components/Form/form";
import "../Search/search.css";

function Search() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function loadBooks() {
    API.getBooksByTitle(searchTerm)
      .then((res) => {
        setBooks(res);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setSearchTerm(value.replace(/\s/g, ""));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchTerm) {
      loadBooks();
    }
  }

  function handleSaveSubmit(bookData) {
    API.saveBook({
      _id: bookData.id,
      title: bookData.title,
      authors: bookData.authors,
      description: bookData.description,
      image: bookData.image,
      link: bookData.link,
    });
  }

  return (
    <Container fluid>
      <Row>
        <div className="hero">
          <Jumbotron>
            <h1>Google Books Search</h1>
          </Jumbotron>
        </div>
        <Col size="md-12">
          <form className="d-flex">
            <Input
              onChange={handleInputChange}
              name="title"
              style={{
                textAlign: "center",
                backgroundColor: "rgb(232,240,254)",
              }}
              placeholder='Search for a book by title'
            />
            <FormBtn
              style={{
                textAlign: "center",
                backgroundColor: "rgb(232,240,254)",
              }}
              onClick={handleSearchSubmit}
            >
              <i className="fas fa-search"></i>
            </FormBtn>
          </form>
        </Col>
        <Col size="md-12">
          <Card>
            <h4 className="text-center">Search Results</h4>
            {books.length > 0 ? (
              <List>
                {books.map((book) => (
                  <ListItem key={book.id}>
                    <Card>
                      <SaveBtn
                        handleSaveSubmit={handleSaveSubmit}
                        bookData={book}
                      >
                        <i className="far fa-heart"></i>
                      </SaveBtn>
                      <ViewBtn link={book.link} />
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
              <p className="display-message text-center mt-5">
                No Results to Display
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
