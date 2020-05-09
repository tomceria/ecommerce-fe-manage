import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import EditAttributeCtn from "../containers/EditAttributeCtn";
import DeleteAttributeCtn from "../containers/DeleteAttributeCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditAttribute = () => {
  const routeMatch = useRouteMatch();
  const attributeId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/attributes" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Attribute list</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteAttributeCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Edit Attribute</h2>
        <EditAttributeCtn subjectId={attributeId} />
      </LayoutCard>
    </>
  );
};

export default EditAttribute;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  justify-content: space-between;

  & > div > a {
    text-decoration: none;
  }

  & > div > * > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;
