import { useEffect } from "react";
import style from "./App.module.scss";
import { useDispatch } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header";
import Books from "./pages/Books";
import BookPost from "./pages/bookPost/BookPost";
import CreateBook from "./components/createBook/CreateBook";
import EditBook from "./components/editBook/EditBook";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Page404 from "./components/404/Page404";

import { isLoggedIn } from "./redux/reducers/UserSlice";
import { fetchBooks } from "./redux/reducers/BooksSlice";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("users")) {
      dispatch(isLoggedIn(true));
    }
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
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:bookID/edit" element={<EditBook />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
