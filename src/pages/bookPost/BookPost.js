import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Book from "../../components/book/Book";

import style from "./BookPost.module.scss";

const BookPost = () => {
  const books = useSelector((state) => state.booksReducer.books);

  const { bookID } = useParams();

  const changeBook = (ids) => {
    let result = books.filter((book) => book.id === ids);
    const [obj] = result;
    return obj;
  };

  return (
    <div className={style.body}>
      <div className={style.wrapper}>
        <Book {...changeBook(bookID)} />
      </div>
    </div>
  );
};

export default BookPost;
