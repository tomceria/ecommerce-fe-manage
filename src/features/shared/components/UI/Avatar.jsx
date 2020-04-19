import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Avatar = ({ width, height, image, alt }) => {
  return (
    <Avi width={width} height={height}>
      <img src={image} alt={alt} />
    </Avi>
  );
};

export default Avatar;

// PropTypes
Avatar.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
Avatar.defaultProps = {
  width: undefined,
  height: undefined
};

// Styles
const Avi = styled.div`
  width: ${props => props.width || props.height};
  height: ${props => props.height || props.width};
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;
