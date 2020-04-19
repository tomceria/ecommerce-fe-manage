import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as FullLogo } from "../../../../assets/logos/Tempest_Logo_Full.svg";
import { ReactComponent as IconLogo } from "../../../../assets/logos/Tempest_Logo_Icon.svg";
import { ReactComponent as MaskedLogo } from "../../../../assets/logos/Tempest_Logo_Masked.svg";
import { colors } from "../../../../styles/variables/colors.style";

const SysLogo = ({ type, color, className, style }) => {
  const logoStyles = {
    ...style,
    fill: color
  };
  return (
    <>
      {type === "full" && <FullLogo style={logoStyles} className={className} />}
      {type === "icon" && <IconLogo style={logoStyles} className={className} />}
      {(!type || type === "masked") && <MaskedLogo style={logoStyles} className={className} />}
    </>
  );
};

export default SysLogo;

// PropTypes
SysLogo.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.string
};
SysLogo.defaultProps = {
  type: "",
  color: colors.font,
  className: "",
  style: ""
};
