import React from "react";
import classNames from "classnames";
import style from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBookArray, toggleBooks } from "../../redux/reducers/BooksSlice";
import { isLoggedIn } from "../../redux/reducers/UserSlice";

const Header = () => {
  const { isAuth } = useSelector((store) => store.usersReducer);
  const dispatch = useDispatch();

  const switchCreat = () => {
    dispatch(toggleBooks(false));
  };

  const logoutUser = () => {
    localStorage.removeItem("users");
    dispatch(isLoggedIn(false));
    dispatch(toggleBooks(null));
  };

  return (
    <div className={style.wrapper}>
      <NavLink
        to={"/"}
        style={{ textDecoration: "none" }}
        onClick={() => dispatch(clearBookArray())}
      >
        <div className={style.logo}>BOOKS</div>
      </NavLink>
      {isAuth ? (
        <div className={style.profile}>
          <NavLink to="/books/create" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className={style.create}
              onClick={switchCreat}
            >
              New book
            </button>
          </NavLink>
          <NavLink to="/">
            <button
              type="button"
              className={classNames(style.logOut, style.enterButton)}
              onClick={logoutUser}
            >
              Log Out
            </button>
          </NavLink>
        </div>
      ) : (
        <>
          <div className={style.enter}>
            <NavLink to="/signIn">
              <button
                type="button"
                className={classNames(style.signIn, style.enterButton)}
              >
                Sign In
              </button>
            </NavLink>
            <NavLink to="/signUp">
              <button
                type="button"
                className={classNames(style.signUp, style.enterButton)}
              >
                Sign Up
              </button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
