import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewAccountStaffsCtn from "../containers/ViewAccountStaffsCtn";

const ViewAccountStaffs = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/admin/staffs/add" style={{ flexGrow: 1 }}>
            <Button color="primary">Add Staff</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Staff</h2>
        <ViewAccountStaffsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "Staff.id", sortId: "accountStaffId", label: "Staff ID", width: 120 },
            { id: "username", label: model.find(e => e.name === "username").label },
            { id: "email", label: model.find(e => e.name === "email").label },
            {
              id: "Staff.roleId",
              sortId: "roleId",
              label: model.find(e => e.name === "roleId").label,
              width: 150
            },
            { id: "createdAt", label: "Created at", width: 170 },
            {
              id: "Staff.locked",
              sortId: "locked",
              label: model.find(e => e.name === "locked").label,
              width: 150
            },
            {
              id: "password",
              label: model.find(e => e.name === "password").label,
              width: 150,
              noSort: true
            }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewAccountStaffs;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
  }

  & > div > * > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;
