import React, { useState } from "react";
import style from "./BookList.module.scss";
import Book from "../book/Book";
import { useSelector } from "react-redux";

import Select from "../UI/select/Select";
import Spinner from "../UI/spin/Spin";

const BookList = () => {
  const books = useSelector((state) => state.booksReducer.books);
  const status = useSelector((state) => state.booksReducer.status);

  return (
    <div className={style.wrapper}>
      <ul className={style.bookList}>
        {status === "resolved" ? (
          books.map((book) => (
            <li className={style.book} key={book.id}>
              <Book {...book} />
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default BookList;
