import SearchBox from "./SearchBox";
import TableQuote from "./TableQuote";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import { useState } from "react";
import React from "react";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState([]);
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");

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
    setIsSort(!isSort);
  };

  return (
    <div>
      <Switch>
        <Route path="/Posts" exact>
          <SearchBox
            search={search}
            setSearch={setSearch}
            handleChange={handleChange}
          ></SearchBox>
          <TableQuote
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setQuote={setQuote}
            isSort={isSort}
            handleOnClick={handleOnClick}
            quoteFiltered={quoteFiltered}
          ></TableQuote>
        </Route>
        <Route path="/Posts/:id" component={Detail}></Route>
      </Switch>
    </div>
  );
};

export default Posts;
