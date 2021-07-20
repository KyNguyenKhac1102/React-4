import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import React from "react";

const Detail = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState({
    title: null,
    body: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((reponse) => {
        setQuote({ title: reponse.data.title, body: reponse.data.body });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      <div className="detail-group">
        <div className="row-id">Id: {id}</div>
        <div className="group-title">
          <label className="label-title">Title</label>
          <div className="content-title">{quote.title} </div>
        </div>
        <div className="group-body">
          <label className="label-body">Body</label>
          <div className="content-body">{quote.body}</div>
        </div>
      </div>
    );
  }
};

export default Detail;
