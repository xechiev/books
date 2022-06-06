import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Route } from "react-router-dom";
import { isLoggedIn } from "../../redux/reducers/UserSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [indicator, setIndicator] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(isLoggedIn(true));
      setIndicator(true);
    } else {
      setIndicator(false);
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        indicator ? <Component {...props} /> : navigate("/signIn")
      }
    />
  );
};

export default PrivateRoute;
