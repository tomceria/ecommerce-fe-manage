import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import EditBrandCtn from "../containers/EditBrandCtn";
import DeleteBrandCtn from "../containers/DeleteBrandCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const EditBrand = () => {
  const routeMatch = useRouteMatch();
  const brandId = routeMatch.params.id;

  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/brands" style={{ flexGrow: 1 }}>
            <Button color="primary">Go to Brand list</Button>
          </Link>
        </div>
        <div>
          <span style={{ flexGrow: 1 }}>
            <DeleteBrandCtn />
          </span>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Edit Brand</h2>
        <EditBrandCtn subjectId={brandId} />
      </LayoutCard>
    </>
  );
};

export default EditBrand;

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
