import React from "react";
import classNames from "classnames";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={style.wrapper}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <div className={style.logo}>BOOKS</div>
      </Link>
      <div className={style.enter}>
        <button
          type="button"
          className={classNames(style.signIn, style.enterButton)}
        >
          Sign In
        </button>

        <button
          type="button"
          className={classNames(style.signUp, style.enterButton)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
