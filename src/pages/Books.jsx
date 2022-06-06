import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookList from "../components/booksList/BookList";
import Select from "../components/UI/select/Select";
import { sortByTitle, sortByPublishedDate } from "../redux/reducers/BooksSlice";

const Books = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onSort = (sort) => {
    if (sort === "publishedDate") dispatch(sortByPublishedDate());
    if (sort === "title") dispatch(sortByTitle());
    setValue(sort);
  };

  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginLeft: "6.5%",
          marginTop: "2%",
        }}
      >
        <Select
          value={value}
          onChange={onSort}
          defaultValue="Сортировка по"
          options={[
            { value: "title", name: "По названию" },
            { value: "publishedDate", name: "По году публикации" },
          ]}
        />
      </div>
      <BookList />
    </div>
  );
};

export default Books;
