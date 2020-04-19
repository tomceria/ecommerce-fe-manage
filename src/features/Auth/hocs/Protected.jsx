import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import request from "../../../utils/request.util";

const Protected = ({ roles, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInRoles, setIsInRoles] = useState(false);

  useEffect(() => {
    async function goCheckRole() {
      try {
        await request("post", "/auth/check-role", { roles });
        setIsInRoles(true);
      } catch (e) {
        setIsInRoles(false);
      }
      setIsLoading(false);
    }
    goCheckRole();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          {isInRoles && children}
          {!isInRoles && <p>Access Denied</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Protected;

// PropTypes
Protected.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element
};
Protected.defaultProps = {
  children: null
};
