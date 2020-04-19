import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as FullLogo } from "../../../../assets/Bambi_Logo_Full.svg";
import { ReactComponent as IconLogo } from "../../../../assets/Bambi_Logo_Icon.svg";
import { ReactComponent as IconDullLogo } from "../../../../assets/Bambi_Logo_Icon_nocolor.svg";
import { ReactComponent as TextLogo } from "../../../../assets/Bambi_Logo_TextLogo.svg";
import { ReactComponent as TextDullLogo } from "../../../../assets/Bambi_Logo_TextLogo_blank.svg";

const ClientLogo = ({ type, color, className, style }) => {
  const logoStyles = {
    ...style,
    fill: color
  };
  return (
    <>
      {type === "full" && <FullLogo style={logoStyles} className={className} />}
      {type === "icon" && <IconLogo style={logoStyles} className={className} />}
      {type === "iconDull" && <IconDullLogo style={logoStyles} className={className} />}
      {type === "text" && <TextLogo style={logoStyles} className={className} />}
      {(!type || type === "textDull") && <TextDullLogo style={logoStyles} className={className} />}
    </>
  );
};

export default ClientLogo;

// PropTypes
ClientLogo.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.string
};
ClientLogo.defaultProps = {
  type: "",
  className: "",
  style: ""
};
