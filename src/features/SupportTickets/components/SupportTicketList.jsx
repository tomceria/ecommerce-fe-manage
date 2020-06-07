import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import LinkDisplay from "../../shared/components/Data/LinkDisplay";
import DateDisplay, { dateDisplayString } from "../../shared/components/Data/DateDisplay";
import SupportTicketStatusDisplay from "../../shared/components/Data/SupportTicketStatusDisplay";
import Table from "../../shared/components/Data/Table";
import Tooltip from "../../shared/components/Data/Tooltip";

const SupportTicketList = ({
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
  const [supportTickets, setSupportTickets] = useState([]);

  useEffect(() => {
    const displayingSupportTickets = items.map(item => ({
      ...item,
      supportTicketId: (
        <span>
          <LinkDisplay to={`/support/${item.id}`} weight={700}>
            {item.id}
          </LinkDisplay>
        </span>
      ),
      supportTypeId: item.SupportType.name,
      statusId: <SupportTicketStatusDisplay status={item.Status} />,
      customer: (
        <Tooltip
          title={
            <>
              <span>{`User ID: ${item.Customer.id}`}</span>
              <br />
              <span>{`Username: ${item.Customer.Account.username}`}</span>
            </>
          }
          interactive
        >
          <span>{`${item.Customer.Info.lastName} ${item.Customer.Info.firstName} (${item.Customer.Account.email})`}</span>
        </Tooltip>
      ),
      support: (
        <>
          {item.support && (
            <Tooltip
              title={
                <>
                  <span>{`Staff ID: ${item.Support.id}`}</span>
                  <br />
                  <span>{`Email: ${item.Support.Account.email}`}</span>
                </>
              }
              interactive
            >
              <span>{item.Support.Account.username}</span>
            </Tooltip>
          )}
        </>
      ),
      createdAt: (
        <>
          <Tooltip title={`Updated at: ${dateDisplayString(item.updatedAt)}`}>
            <span>
              <DateDisplay value={item.createdAt} />
            </span>
          </Tooltip>
        </>
      )
    }));
    setSupportTickets(displayingSupportTickets);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={supportTickets}
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

export default SupportTicketList;

// PropTypes
SupportTicketList.propTypes = {
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
SupportTicketList.defaultProps = {
  pagination: undefined,
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

// Styles
