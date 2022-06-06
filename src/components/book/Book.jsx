import React from "react";
import style from "./Book.module.scss";
import { Link } from "react-router-dom";
import minify from "../../util/minify";

const Book = ({
  id,
  title,
  authors,
  pageCount,
  description,
  isbn,
  publishedDate,
  publisher,
  imageLinks,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <div className={style.info}>
          <img className={style.poster} src={imageLinks} alt={title} />
          <div className={style.depiction}>
            <div className={style.titleLike}>
              <Link to={`/books/${id}`} style={{ textDecoration: "none" }}>
                {title && <h5 className={style.title}>{minify(title, 30)}</h5>}
              </Link>
            </div>
            {description && (
              <p className={style.description}>{minify(description, 150)}</p>
            )}
            <p className={style.data}>Authors: {authors}</p>
            <p className={style.data}>
              Published date: {new Date(publishedDate).getFullYear()}
            </p>
            <p className={style.data}>Page count: {Math.round(pageCount)}</p>
            <p className={style.data}>Publisher: {publisher}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
