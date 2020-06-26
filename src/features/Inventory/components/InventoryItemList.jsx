import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Table from "../../shared/components/Data/Table";
import DateDisplay, { dateDisplayString } from "../../shared/components/Data/DateDisplay";
import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import Tooltip from "../../shared/components/Data/Tooltip";
import ColorBand from "../../shared/components/Data/ColorBand";
import { remScale } from "../../../styles/variables/size.style";

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
  // rowActions,
  // rowActionsDisabled,
  passingRef
}) => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const displayingProducts = items.map(item => ({
      ...item,
      inventoryItemId: (
        <>
          {item.bought ? (
            <Tooltip title={t("INVENTORY.TEXT.LIST.TXT0")}>
              <span>{item.id}</span>
            </Tooltip>
          ) : (
            <LinkDisplay to={`/inventory/${item.id}`} weight={700}>
              {item.id}
            </LinkDisplay>
          )}
        </>
      ),
      Item: {
        name: (
          <LinkDisplay to={`/products/${item.Item.id}`} weight={700}>
            {item.Item.name}
          </LinkDisplay>
        )
      },
      variationId: (
        <Tooltip title={item.Variation.name}>
          <span style={{ display: "flex" }}>
            <ColorBand
              colorsString={item.Variation.colors}
              style={{ height: remScale(21), minWidth: "6rem" }}
            />
          </span>
        </Tooltip>
      ),
      available: (
        <span>
          {item.available ? <b>{t("MODELLING.COMMON.YES")}</b> : t("MODELLING.COMMON.NO")}
        </span>
      ),
      bought: (
        <span>{item.bought ? t("MODELLING.COMMON.YES") : <b>{t("MODELLING.COMMON.NO")}</b>}</span>
      ),
      createdAt: (
        <>
          <Tooltip
            title={`${t("MODELLING.COMMON.UPDATEDAT")}: ${dateDisplayString(item.updatedAt)}`}
          >
            <span>
              <DateDisplay value={item.createdAt} />
            </span>
          </Tooltip>
        </>
      )
    }));
    setProducts(displayingProducts);
  }, [items]); // eslint-disable-line

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
  // rowActions: PropTypes.shape({
  // toggleHide: PropTypes.func
  // }).isRequired,
  // rowActionsDisabled: PropTypes.bool.isRequired,
  passingRef: PropTypes.shape({})
};
ProductList.defaultProps = {
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};
