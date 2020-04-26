import React from "react";
import styled from "styled-components";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewAccountUsersCtn from "../containers/ViewAccountUsersCtn";
import Tooltip from "../../shared/components/Data/Tooltip";

const ViewAccountUsers = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Tooltip title="User must be registered through storefront's website">
            <span style={{ flexGrow: 1 }}>
              <Button disabled color="primary">
                Add User
              </Button>
            </span>
          </Tooltip>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">User</h2>
        <ViewAccountUsersCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "User.id", sortId: "accountUserId", label: "User ID", width: 120 },
            { id: "username", label: model.find(e => e.name === "username").label },
            { id: "email", label: model.find(e => e.name === "email").label },
            { id: "User.Info.lastName", sortId: "lastName", label: "Last name", width: 128 },
            { id: "User.Info.firstName", sortId: "firstName", label: "First name", width: 128 },
            { id: "User.Info.phone", sortId: "phone", label: "Phone" },
            { id: "User.Info.birthday", sortId: "birthday", label: "DOB", width: 100 },
            { id: "createdAt", label: "Created at", width: 170 },
            {
              id: "User.locked",
              sortId: "locked",
              label: model.find(e => e.name === "locked").label,
              width: 150
            }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewAccountUsers;

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
