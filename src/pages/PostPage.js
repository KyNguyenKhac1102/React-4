import { useEffect, useState } from "react";
import axios from "axios";
import Detail from "./DetailPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState([]);
  const [search, setSearch] = useState("");
  const [isSort, setIsSorted] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // handle success
        console.log(response);
        setQuote(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const handleChange = (ev) => {
    console.log(ev.target.value);
    setSearch(ev.target.value);
  };

  const quoteFiltered = quote.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const quoteSorted = isSort
    ? quoteFiltered.sort((q1, q2) => {
        return ("" + q1.title).localeCompare(q2.title);
      })
    : quoteFiltered;

  const handleOnClick = () => {
    setIsSorted(!isSort);
  };

  if (isLoading) {
    return (
      <div style={{ marginLeft: 30 }} className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    );
  } else {
    return (
      <Router>
        <div>
          <Route
            path="/Posts"
            exact
            render={(props) => (
              <div>
                <input
                  style={{ marginLeft: 30 }}
                  placeholder="Search by title"
                  onChange={handleChange}
                ></input>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col" onClick={handleOnClick}>
                        {isSort ? "Title(Sorted)" : "Title"}
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {quoteFiltered.map((quote) => (
                      <tr key={quote.id}>
                        <th scope="row">{quote.id}</th>
                        <td>{quote.title}</td>

                        <td>
                          <Link to={"/Posts/" + quote.id}>View Detail</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          ></Route>
          <Route path="/Posts/:id" exact>
            <Detail></Detail>
          </Route>
        </div>
      </Router>
    );
  }
};

export default Posts;
