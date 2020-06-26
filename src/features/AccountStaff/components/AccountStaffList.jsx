import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import iconLock from "@iconify/icons-bx/bxs-lock";
import iconLockOpen from "@iconify/icons-bx/bx-lock-open";
import iconEdit from "@iconify/icons-bx/bx-edit";

import Table from "../../shared/components/Data/Table";
import Tooltip from "../../shared/components/Data/Tooltip";
import DateDisplay, { dateDisplayString } from "../../shared/components/Data/DateDisplay";
import Button from "../../shared/components/Form/Button";
import ChangeStaffRoleCtn from "../containers/ChangeStaffRoleCtn";

const AccountStaffList = ({
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
  const [accounts, setAccountStaffs] = useState([]);

  useEffect(() => {
    const displayingAccountStaffs = items.map(item => ({
      ...item,
      Staff: {
        ...item.Staff,
        roleId: <ChangeStaffRoleCtn subject={item} onSubmit={rowActions.changeRole} />,
        locked: (
          <div style={{ display: "flex" }}>
            <Button
              color="default"
              onClick={() => rowActions.toggleLock(item)}
              disabled={rowActionsDisabled}
              style={{ flexGrow: 1 }}
            >
              <Icon icon={item.Staff.locked ? iconLock : iconLockOpen} />
              <span>
                {item.Staff.locked ? "Locked" : "Active"}
              </span>
            </Button>
          </div>
        )
      },
      createdAt: (
        <>
          <Tooltip title={`Updated at: ${dateDisplayString(item.updatedAt)}`}>
            <span>
              <DateDisplay value={item.createdAt} />
            </span>
          </Tooltip>
        </>
      ),
      password: (
        <div style={{ display: "flex" }}>
          <Button
            color="default"
            onClick={() => rowActions.changePassword(item)}
            disabled={rowActionsDisabled}
            style={{ flexGrow: 1 }}
          >
            <Icon icon={iconEdit} />
            <span>
              Reset
            </span>
          </Button>
        </div>
      )
    }));
    setAccountStaffs(displayingAccountStaffs);
  }, [items, rowActionsDisabled]); // eslint-disable-line

  return (
    <>
      {!loading && success && (
        <Table
          // Status
          loading={loading}
          // Variables
          tableHead={tableHead}
          items={accounts}
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

export default AccountStaffList;

// PropTypes
AccountStaffList.propTypes = {
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
    toggleLock: PropTypes.func,
    changePassword: PropTypes.func,
    changeRole: PropTypes.func
  }).isRequired,
  rowActionsDisabled: PropTypes.bool.isRequired,
  passingRef: PropTypes.shape({})
};
AccountStaffList.defaultProps = {
  changedPage: undefined,
  changedRowsPerPage: undefined,
  changedSort: undefined,
  passingRef: undefined
};

// Styles
