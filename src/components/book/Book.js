import React from "react";
import style from "./Book.module.scss";
import { Link, useNavigate } from "react-router-dom";
import minify from "../../util/minify";

const Book = ({
  id,
  title,
  authors,
  pageCount,
  description,
  industryIdentifiers,
  publishedDate,
  publisher,
  imageLinks,
}) => {
  if (!publishedDate) publishedDate = "1992-08-03";

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <div className={style.info}>
          <img
            className={style.poster}
            src={imageLinks.thumbnail}
            alt={title}
          />
          <div className={style.depiction}>
            <div className={style.titleLike}>
              <Link to={`/books/${id}`} style={{ textDecoration: "none" }}>
                <h5 className={style.title}>{minify(title, 30)}</h5>
              </Link>
            </div>
            <p className={style.description}>{description}</p>
            <p className={style.data}>Authors: {authors}</p>
            <p className={style.data}>
              Published date: {new Date(publishedDate).getFullYear()}
            </p>
            {pageCount && <p className={style.data}>Page count: {pageCount}</p>}
            {publisher && <p className={style.data}>Publisher: {publisher}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
