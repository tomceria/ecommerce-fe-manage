import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import iconUp from "@iconify/icons-bx/bx-up-arrow-alt";
import iconDown from "@iconify/icons-bx/bx-down-arrow-alt";

import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import Table from "../../shared/components/Data/Table";
import Button from "../../shared/components/Form/Button";

const ScaleList = ({
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
  const [scales, setScales] = useState([]);

  useEffect(() => {
    const displayingScales = items.map(item => ({
      ...item,
      name: (
        <span key={`${item.id}_name`}>
          <LinkDisplay to={`/products/scales/${item.id}`} weight={700}>
            {item.name}
          </LinkDisplay>
        </span>
      ),
      placing: (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Button
            onClick={() => rowActions.swap(item, true)}
            disabled={rowActionsDisabled || items[0].id === item.id}
          >
            <Icon icon={iconUp} />
          </Button>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem"
            }}
          >
            {item.placing}
          </span>
          <Button
            onClick={() => rowActions.swap(item, false)}
            disabled={rowActionsDisabled || items[items.length - 1].id === item.id}
          >
            <Icon icon={iconDown} />
          </Button>
        </div>
      )
    }));
    setScales(displayingScales);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={scales}
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

export default ScaleList;

// PropScales
ScaleList.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ).isRequired,
  filters: PropTypes.shape({}).isRequired,
  pagination: PropTypes.shape({}),
  changedPage: PropTypes.func,
  changedRowsPerPage: PropTypes.func,
  changedSort: PropTypes.func,
  rowActions: PropTypes.shape({
    swap: PropTypes.func
  }).isRequired,
  rowActionsDisabled: PropTypes.bool.isRequired,
  passingRef: PropTypes.shape({})
};
ScaleList.defaultProps = {
  pagination: undefined,
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

// Styles
