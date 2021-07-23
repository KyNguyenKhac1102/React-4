import { useEffect, useState } from "react";
import axios from "axios";

const Author = () => {
  let [authors, setAuthor] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/Author")
      .then((response) => {
        console.log(response);
        authors = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div>Author</div>
      {authors.map((author) => (
        <div>author.authorId</div>
      ))}
    </div>
  );
};

export default Author;
