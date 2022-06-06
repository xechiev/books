import React, { useState } from "react";
import classes from "./CreateBook.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import * as yup from "yup";
import { createBook, updateBook } from "../../redux/reducers/BooksSlice";
import { Alert } from "react-bootstrap";

const SignupSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  authors: yup.string().required(),
  publishedDate: yup.string().required(),
  pageCount: yup.number().required(),
  publisher: yup.string().required(),
});

const CreateBook = () => {
  const { book, toggleBook } = useSelector((state) => state.booksReducer);
  const [articleSend, setArticleSend] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const params = useParams();
  const { bookID } = params;

  const onSubmit = (data) => {
    console.log(data, bookID);
    if (toggleBook) {
      dispatch(updateBook(data, bookID));
      setArticleSend(true);
    } else {
      dispatch(createBook(data));
      setArticleSend(true);
    }
    setTimeout(() => {
      navigate(`/books/${bookID}`);
      setArticleSend(false);
    }, 1500);
  };

  return (
    <div className={classes.body}>
      <div className={classes.wrapper}>
        {articleSend ? (
          <>
            <Alert variant="primary" className={classes.alert}>
              {toggleBook ? "Article edited!" : "Article created!"}
            </Alert>
          </>
        ) : (
          <>
            <h5 className={classes.name}>
              {toggleBook ? "Edit book" : "Create new book"}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h6 className={classes.title}>Title</h6>
              <input
                {...register("title")}
                className={classes.form}
                placeholder="Title"
                defaultValue={toggleBook ? book.title : ""}
              />
              {errors.title && (
                <p className={classes.errors}>{errors.title.message}</p>
              )}
              <h6 className={classes.title}>Authors</h6>
              <input
                {...register("authors")}
                className={classes.form}
                defaultValue={toggleBook ? book.authors : ""}
                placeholder="authors"
              />
              {errors.authors && (
                <p className={classes.errors}>{errors.authors.message}</p>
              )}
              <h6 className={classes.title}>Published date</h6>
              <input
                {...register("publishedDate")}
                className={classes.form}
                defaultValue={
                  toggleBook ? new Date(book.publishedDate).getFullYear() : ""
                }
                placeholder="publishedDate"
              />
              {errors.publishedDate && (
                <p className={classes.errors}>{errors.publishedDate.message}</p>
              )}
              <h6 className={classes.title}>Page count</h6>
              <input
                {...register("pageCount")}
                className={classes.form}
                defaultValue={toggleBook ? Math.round(book.pageCount) : ""}
                placeholder="pageCount"
              />
              {errors.pageCount && (
                <p className={classes.errors}>{errors.pageCount.message}</p>
              )}
              <h6 className={classes.title}>Publisher</h6>
              <input
                {...register("publisher")}
                className={classes.form}
                defaultValue={toggleBook ? book.publisher : ""}
                placeholder="publisher"
              />
              {errors.publisher && (
                <p className={classes.errors}>{errors.publisher.message}</p>
              )}
              <h6 className={classes.title}>Description</h6>
              <textarea
                {...register("description")}
                className={classNames(classes.form, classes.textarea)}
                defaultValue={toggleBook ? book.description : ""}
                placeholder="Text"
              />
              {errors.description && (
                <p className={classes.errors}>{errors.description.message}</p>
              )}

              <button type="submit" className={classes.submit}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
