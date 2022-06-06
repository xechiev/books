import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import Book from "../../components/book/Book";
import Spinner from "../../components/UI/spin/Spin";
import {
  deleteBook,
  fetchBook,
  toggleBooks,
} from "../../redux/reducers/BooksSlice";

import style from "./BookPost.module.scss";

const BookPost = () => {
  const { book, status } = useSelector((state) => state.booksReducer);
  const { isAuth } = useSelector((store) => store.usersReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookID } = useParams();

  useEffect(() => {
    dispatch(fetchBook(bookID));
  }, [dispatch]);

  const text = "Are you sure to delete this article?";

  const confirm = () => {
    message.info("Article deleted!");
  };

  const deleteArticle = () => {
    dispatch(deleteBook(bookID));
    confirm();
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const switchEdit = () => {
    dispatch(toggleBooks(true));
  };

  return (
    <div className={style.body}>
      {status === "resolved" ? (
        <div className={style.wrapper}>
          <Book {...book} />
          {isAuth && (
            <div className={style.editDelete}>
              <Popconfirm
                placement="rightTop"
                title={text}
                onConfirm={deleteArticle}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={style.delete}>
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/books/${bookID}/edit`}>
                <button
                  type="button"
                  className={style.edit}
                  onClick={switchEdit}
                >
                  Edit
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BookPost;
