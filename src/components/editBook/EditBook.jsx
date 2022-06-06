import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchBook, toggleBooks } from "../../redux/reducers/BooksSlice";
import CreateBook from "../createBook/CreateBook";

const EditBook = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { bookID } = params;

  useEffect(() => {
    dispatch(fetchBook(bookID));
    dispatch(toggleBooks(true));
  }, [dispatch, bookID]);

  return <CreateBook />;
};

export default EditBook;
