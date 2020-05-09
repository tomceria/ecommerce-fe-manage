import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import model from "../models";
import ViewProductsCtn from "../containers/ViewProductsCtn";
import { LayoutCard } from "../../shared/components/UI/Card";
import Button from "../../shared/components/Form/Button";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewProducts = () => {
  return (
    <>
      <LayoutCardStyled>
        <div>
          <Link to="/products/add">
            <Button color="primary">Add Product</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/brands">
            <Button color="secondary">View Brands</Button>
          </Link>
          <Link to="/products/types">
            <Button color="secondary">View Types</Button>
          </Link>
        </div>
        <div>
          <Link to="/products/attributes">
            <Button color="secondary">View Attributes</Button>
          </Link>
        </div>
      </LayoutCardStyled>
      <LayoutCard>
        <h2 className="title">Products</h2>
        <ViewProductsCtn
          initialFilters={{
            query: "",
            page: 1,
            size: 25,
            sort: "createdAt",
            sortDesc: true
          }}
          tableHead={[
            { id: "name", label: model.find(e => e.name === "name").label, width: 200 },
            { id: "image", label: "Image", noSort: true },
            { id: "price", label: model.find(e => e.name === "price").label, width: 135 },
            { id: "type", label: model.find(e => e.name === "type").label },
            { id: "brand", label: model.find(e => e.name === "brand").label },
            { id: "year", label: model.find(e => e.name === "year").label },
            { id: "createdAt", label: "Created at", width: 125 },
            { id: "hidden", label: "Visibility", width: 150 }
          ]}
        />
      </LayoutCard>
    </>
  );
};

export default ViewProducts;

// Styles
const LayoutCardStyled = styled(LayoutCard)`
  & > div > a {
    text-decoration: none;
    flex-grow: 1;
  }

  & > div > a > button {
    width: 100%;
  }

  ${templates.EVENLY_SPACED}
`;
