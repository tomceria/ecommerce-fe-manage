import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import iconShow from "@iconify/icons-bx/bx-show";
import iconHide from "@iconify/icons-bx/bx-hide";

import Table from "../../shared/components/Data/Table";
import NumberDisplay from "../../shared/components/Data/NumberDisplay";
import DateDisplay, { dateDisplayString } from "../../shared/components/Data/DateDisplay";
import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import Tooltip from "../../shared/components/Data/Tooltip";
import Button from "../../shared/components/Form/Button";
import { uploadPath } from "../../../configs/api.config";

const ProductList = ({
  loading,
  success,
  tableHead,
  items,
  filters,
  pagination,
  changedPage,
  changedRowsPerPage,
  changedSort,
  rowActions,
  rowActionsDisabled,
  passingRef
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const displayingProducts = items.map(item => ({
      ...item,
      name: (
        <LinkDisplay to={`/products/${item.id}`} weight={700}>
          {item.name}
        </LinkDisplay>
      ),
      image: (
        <ImageCtn>
          <img src={`${uploadPath}/${item.Imgs[0].Media.url}`} alt={item.name} />
        </ImageCtn>
      ),
      price: <NumberDisplay type="currency" value={item.price} />,
      createdAt: (
        <>
          <Tooltip title={`Updated at: ${dateDisplayString(item.updatedAt)}`}>
            <span>
              <DateDisplay value={item.createdAt} />
            </span>
          </Tooltip>
        </>
      ),
      type: item.Type && (
        <LinkDisplay to={`products/types/${item.Type.id}`} weight={500}>
          {item.Type.name}
        </LinkDisplay>
      ),
      brand: item.Brand && (
        <p>
          <LinkDisplay to={`products/brands/${item.Brand.id}`} weight={500}>
            {item.Brand.name}
          </LinkDisplay>
        </p>
      ),
      hidden: (
        <div style={{ display: "flex" }}>
          <Button
            color="default"
            onClick={() => rowActions.toggleHide(item)}
            disabled={rowActionsDisabled}
            style={{ flexGrow: 1 }}
          >
            <Icon icon={item.hidden ? iconHide : iconShow} />
            <span>{item.hidden ? "Hidden" : "Visible"}</span>
          </Button>
        </div>
      )
    }));
    setProducts(displayingProducts);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={products}
          filters={filters}
          pagination={pagination}
          // Functions / Handlers
          onChangePage={changedPage}
          onChangeRowsPerPage={changedRowsPerPage}
          onChangeSort={changedSort}
          // Others
          passingRef={passingRef}
        />
      )}
      {!loading && !success && <p>Error</p>}
    </>
  );
};

export default ProductList;

// PropTypes
ProductList.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.shape({}).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  changedPage: PropTypes.func,
  changedRowsPerPage: PropTypes.func,
  changedSort: PropTypes.func,
  rowActions: PropTypes.shape({
    toggleHide: PropTypes.func
  }).isRequired,
  rowActionsDisabled: PropTypes.bool.isRequired,
  passingRef: PropTypes.shape({})
};
ProductList.defaultProps = {
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

// Styles
const ImageCtn = styled.div`
  height: 3.25rem;
  width: 3.25rem;
  display: flex;
  align-items: center;

  & > img {
    max-height: 100%;
    max-width: 100%;
  }
`;
