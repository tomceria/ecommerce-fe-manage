import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { performDoAuthenticate } from "../actions";
import { selectIsAuth, selectIsFinishAuth } from "../reducers";
import LoginPage from "../pages/LoginPage";

const AuthContainer = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthen = useSelector(selectIsAuth);
  const isFinishAuthening = useSelector(selectIsFinishAuth);

  const [stateCurrentPath, setStateCurrentPath] = useState("/");

  const setCurrentPath = useCallback(() => {
    let { pathname } = location;
    if (pathname === "/login") {
      pathname = "/";
    }
    setStateCurrentPath(pathname + location.search);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPath();
    dispatch(performDoAuthenticate());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isFinishAuthening &&
        (isAuthen ? (
          <>
            <Redirect to={stateCurrentPath} />
            {children}
          </>
        ) : (
          <>
            <Redirect to="/login" />
            <LoginPage />
          </>
        ))}
    </>
  );
};

export default AuthContainer;

// PropTypes
AuthContainer.propTypes = {
  children: PropTypes.element
};
AuthContainer.defaultProps = {
  children: null
};
