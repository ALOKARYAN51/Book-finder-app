import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  author: "",
  date: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, author, date } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("date").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !author || !date) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("date").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Book Added Successfully");
          }
        });
      } else {
        fireDb.child(`date/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Book Updated Successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Title</label>
        <input
          type="text"
          id="name"
          name="name"
          placeHolder="Book Title..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          placeHolder="Author..."
          value={author || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="date">Published date</label>
        <input
          type="date"
          id="date"
          name="date"
          placeHolder="Published date..."
          value={date || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;