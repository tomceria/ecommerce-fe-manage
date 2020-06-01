import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import DateDisplay from "../../shared/components/Data/DateDisplay";
import Table from "../../shared/components/Data/Table";

const PromotionList = ({
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
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const displayingPromotions = items.map(item => ({
      ...item,
      name: (
        <span key={`${item.id}_name`}>
          <LinkDisplay to={`/promotions/${item.id}`} weight={700}>
            {item.name}
          </LinkDisplay>
        </span>
      ),
      timeStart: <DateDisplay value={item.timeStart} />,
      timeEnd: <DateDisplay value={item.timeEnd} />
    }));
    setPromotions(displayingPromotions);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={promotions}
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

export default PromotionList;

// PropTypes
PromotionList.propTypes = {
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
PromotionList.defaultProps = {
  pagination: undefined,
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

// Styles
