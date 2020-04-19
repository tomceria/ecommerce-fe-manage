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
          <Link to="/products/categories">
            <Button color="secondary">View Categories</Button>
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
            { id: "masp", label: model.find(e => e.name === "masp").label, width: 150 },
            { id: "image", label: "Image", noSort: true },
            { id: "priceOg", label: model.find(e => e.name === "priceOg").label },
            { id: "price", label: model.find(e => e.name === "price").label, width: 135 },
            { id: "brand", label: model.find(e => e.name === "brand").label, width: 450 },
            { id: "category", label: model.find(e => e.name === "category").label, width: 150 },
            { id: "createdAt", label: "Created at", width: 125 }
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
