import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { performGetAccountUsers } from "../actions";
import { selectAccountUsersFilters, selectAccountUsers } from "../reducers";
import { useAccountUserFilters, useAccountUserSubInfo } from "../hooks";
import ConfirmLockAccountUser from "../pages/modals/ConfirmLockAccountUser";

import AccountUserList from "../components/AccountUserList";
import AccountUserFilterForm from "../components/AccountUserFilterForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import request from "../../../utils/request.util";
import {
  filterSubmitHandler,
  filtersReloadHandler,
  changePageHandler,
  changeRowsPerPageHandler,
  changeSortHandler
} from "../../../utils/filter.util";
import { templates } from "../../../styles/stylings/stylings.style";

const ViewAccountUsersCtn = ({ initialFilters, tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const snackbar = useSnackbar();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectAccountUsersFilters);
  const fetchedAccountUsers = useSelector(selectAccountUsers.accountUsers);
  const pagination = useSelector(selectAccountUsers.pagination);
  const isLoadingAccountUsers = useSelector(selectAccountUsers.isLoadingAccountUsers);
  const isSuccessAccountUsers = useSelector(selectAccountUsers.isSuccessAccountUsers);

  const isLoadingFilterForm = !useAccountUserSubInfo();
  useAccountUserFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  const topRef = useRef(null);

  // Local UI States

  const [accountUsers, setAccountUsers] = useState([]);
  const [modalConfirmLockAccount, setModalConfirmLockAccount] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    setAccountUsers(fetchedAccountUsers);
  }, [fetchedAccountUsers]);

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetAccountUsers, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetAccountUsers, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetAccountUsers, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetAccountUsers, filters, { location, history, dispatch });
  };

  // Other Handlers
  const handleOnConfirmLockAccountUser = async account => {
    setIsUpdating(true);
    const newValue = !account.User.locked;
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      setModalConfirmLockAccount(null);
      await request("patch", `/accountUser/${account.User.id}/locked`, {
        locked: newValue
      });
      setAccountUsers(prevState => {
        const newAccountUsers = [...prevState].map(o => {
          if (o.User.id === account.User.id) {
            return {
              ...o,
              User: {
                ...o.User,
                Role: { ...o.User.Role },
                locked: newValue
              }
            };
          }
          return o;
        });
        return newAccountUsers;
      });
      snackbar.enqueueSnackbar(`${newValue ? "Locked" : "Unlocked"} account successfully!`, {
        variant: "success"
      });
    } catch (e) {
      snackbar.enqueueSnackbar(e.response.data.message, {
        variant: "error"
      });
    }
    snackbar.closeSnackbar(loadingSb);
    setIsUpdating(false);
  };

  return (
    <>
      {/* MODALS */}
      <ConfirmLockAccountUser
        account={modalConfirmLockAccount}
        onClose={() => setModalConfirmLockAccount(null)}
        onConfirm={handleOnConfirmLockAccountUser}
      />
      {/* end MODALS */}
      <AccountUserFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <AccountUserFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingAccountUsers || isUpdating}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </AccountUserFilterFormWrapper>
      <AccountUserList
        // Status
        loading={isLoadingAccountUsers}
        success={isSuccessAccountUsers}
        // Variables
        tableHead={tableHead}
        items={!isLoadingAccountUsers ? accountUsers : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        rowActions={{
          toggleLock: account => setModalConfirmLockAccount(account)
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewAccountUsersCtn;

// PropTypes
ViewAccountUsersCtn.propTypes = {
  initialFilters: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    size: PropTypes.number,
    sort: PropTypes.string,
    sortDesc: PropTypes.bool
  }).isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

// Styles
const AccountUserFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;
