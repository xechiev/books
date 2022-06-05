import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Books from "./pages/Books";
import BookPost from "./pages/bookPost/BookPost";
import Page404 from "./components/404/Page404";

import { addBooks, fetchBooks } from "./redux/reducers/BooksSlice";

import "antd/dist/antd.css";
import style from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={style.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books-list" element={<Books />} />
          <Route path="/books/:bookID" element={<BookPost />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
