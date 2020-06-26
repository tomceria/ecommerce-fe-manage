import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import NewAccountStaffCtn from "../containers/NewAccountStaffCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const NewAccountStaff = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/admin/staffs" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Staff list</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">New Staff</h2>
        <NewAccountStaffCtn />
      </LayoutCard>
    </>
  );
};

export default NewAccountStaff;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;
