import { InputGroup, FormControl, Container } from "react-bootstrap";
import React from "react";

const SearchBox = ({ search, setSearch, handleChange }) => {
  return (
    <Container className="my-3">
      <InputGroup>
        <FormControl
          onChange={handleChange}
          style={{ maxWidth: 300 }}
          size="sm"
          placeholder="Search by title"
        ></FormControl>
      </InputGroup>
    </Container>
  );
};

export default SearchBox;
