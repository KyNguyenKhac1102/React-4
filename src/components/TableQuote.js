import { useEffect } from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

const fetchData = (setQuote, setIsLoading) => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(function (response) {
      console.log(response);
      setQuote(response.data);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const TableQuote = ({
  isLoading,
  setIsLoading,
  setQuote,
  isSort,
  handleOnClick,
  quoteFiltered,
}) => {
  useEffect(() => {
    fetchData(setQuote, setIsLoading);
  }, [setQuote, setIsLoading]);

  if (isLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  } else {
    return (
      <Container style={{ maxWidth: 1500, margin: "auto" }}>
        <Table striped bordered>
          <thead>
            <tr>
              <td>ID</td>
              <td colSpan="2" onClick={handleOnClick}>
                {!isSort ? "Title" : "Title(Sorted)"}
              </td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {quoteFiltered.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td colSpan="2">{q.title}</td>
                <td>
                  <Link to={"/Posts/" + q.id}>View Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default TableQuote;
