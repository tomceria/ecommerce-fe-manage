import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import model from "../models";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";
import ViewScalesCtn from "../containers/ViewScalesCtn";

const ViewScales = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products" style={{ flexGrow: 1 }}>
            <Button color="default">View Product list</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/scales/add" style={{ flexGrow: 1 }}>
            <Button color="primary">Add Scale</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Scales</h2>
        <ViewScalesCtn
          tableHead={[
            { id: "id", label: model.find(e => e.name === "id").label, noSort: true },
            { id: "name", label: model.find(e => e.name === "name").label, noSort: true },
            {
              id: "description",
              label: model.find(e => e.name === "description").label,
              noSort: true
            },
            { id: "placing", label: "Placing", width: 192, noSort: true }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewScales;

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
