import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Table from "../../shared/components/Data/Table";
import NumberDisplay from "../../shared/components/Data/NumberDisplay";
import DateDisplay from "../../shared/components/Data/DateDisplay";
import LinkDisplay from "../../shared/components/Data/LinkDisplay";
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
          <img src={`${uploadPath}/items/${item.Item_Imgs[0].img}`} alt={item.name} />
        </ImageCtn>
      ),
      priceOg: <NumberDisplay type="currency" value={item.priceOg} />,
      price: <NumberDisplay type="currency" value={item.price} />,
      createdAt: (
        <>
          <DateDisplay value={item.createdAt} />
          {item.createdAt !== item.updatedAt && (
            <>
              <p>Updated at: </p>
              <DateDisplay value={item.updatedAt} />
            </>
          )}
        </>
      ),
      brand: item.Brand && (
        <p>
          {item.Brand.superTH && (
            <>
              <LinkDisplay to={`/brands/${item.Brand.superTH}`} weight={500}>
                {item.Brand.SuperTH.name}
              </LinkDisplay>
              &nbsp;/&nbsp;
            </>
          )}
          <LinkDisplay to={`/brands/${item.Brand.brandId}`} weight={500}>
            {item.Brand.name}
          </LinkDisplay>
        </p>
      ),
      category: item.Category && (
        <LinkDisplay to={`/categories/${item.Category.categoryId}`} weight={500}>
          {item.Category.name}
        </LinkDisplay>
      )
    }));
    setProducts(displayingProducts);
  }, [items]);

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
