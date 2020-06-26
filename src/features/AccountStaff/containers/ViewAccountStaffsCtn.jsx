import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { performGetAccountStaffs } from "../actions";
import { selectAccountStaffsFilters, selectAccountStaffs, selectStaffRoles } from "../reducers";
import { useAccountStaffFilters, useAccountStaffSubInfo } from "../hooks";
import ConfirmLockAccountStaff from "../pages/modals/ConfirmLockAccountStaff";
import ChangeAccountStaffPassword from "../pages/modals/ChangeAccountStaffPassword";

import AccountStaffList from "../components/AccountStaffList";
import AccountStaffFilterForm from "../components/AccountStaffFilterForm";
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

const ViewAccountStaffsCtn = ({ initialFilters, tableHead }) => {
  // Hooks

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const snackbar = useSnackbar();

  const filterFormFuncs = useForm();

  const filters = useSelector(selectAccountStaffsFilters);
  const fetchedAccountStaffs = useSelector(selectAccountStaffs.accountStaffs);
  const staffRoles = useSelector(selectStaffRoles.roles);
  const pagination = useSelector(selectAccountStaffs.pagination);
  const isLoadingAccountStaffs = useSelector(selectAccountStaffs.isLoadingAccountStaffs);
  const isSuccessAccountStaffs = useSelector(selectAccountStaffs.isSuccessAccountStaffs);

  const isLoadingFilterForm = !useAccountStaffSubInfo();
  useAccountStaffFilters(initialFilters, filters, isLoadingFilterForm, filterFormFuncs);

  const topRef = useRef(null);

  // Local UI States

  const [accountStaffs, setAccountStaffs] = useState([]);
  const [modalConfirmLockAccount, setModalConfirmLockAccount] = useState(null);
  const [modalChangeAccountPassword, setModalChangeAccountPassword] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Effects

  useEffect(() => {
    setAccountStaffs(fetchedAccountStaffs);
  }, [fetchedAccountStaffs]);

  // List Handlers
  const handleOnSubmit = data => {
    filterSubmitHandler(data, performGetAccountStaffs, filters, { location, history, dispatch });
  };
  const handleFiltersReload = () => {
    filtersReloadHandler(handleOnSubmit, { filterFormFuncs });
  };
  const handleChangePage = page => {
    changePageHandler(page, performGetAccountStaffs, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeRowsPerPage = event => {
    changeRowsPerPageHandler(event, performGetAccountStaffs, filters, {
      location,
      history,
      dispatch,
      topRef
    });
  };
  const handleChangeSort = key => {
    changeSortHandler(key, performGetAccountStaffs, filters, { location, history, dispatch });
  };

  // Other Handlers
  const handleOnConfirmLockAccountStaff = async account => {
    setIsUpdating(true);
    const newValue = !account.Staff.locked;
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      setModalConfirmLockAccount(null);
      await request("patch", `/accountStaff/${account.Staff.id}/locked`, {
        locked: newValue
      });
      setAccountStaffs(prevState => {
        const newAccountStaffs = [...prevState].map(o => {
          if (o.Staff.id === account.Staff.id) {
            return {
              ...o,
              Staff: {
                ...o.Staff,
                Role: { ...o.Staff.Role },
                locked: newValue
              }
            };
          }
          return o;
        });
        return newAccountStaffs;
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

  const handleOnSubmitChangeAccountPassword = async () => {
    setModalChangeAccountPassword(null);
    handleFiltersReload();
    snackbar.enqueueSnackbar(`Reset account's password successfully!`, {
      variant: "success"
    });
  };

  const handleOnSubmitChangeStaffRole = async (account, newValue) => {
    setIsUpdating(true);
    const loadingSb = snackbar.enqueueSnackbar("Loading", {
      variant: "warning",
      persist: true
    });
    try {
      await request("patch", `/accountStaff/${account.Staff.id}/role`, {
        role: newValue
      });
      setAccountStaffs(prevState => {
        const newAccountStaffs = [...prevState].map(o => {
          if (o.Staff.id === account.Staff.id) {
            return {
              ...o,
              Staff: {
                ...o.Staff,
                roleId: newValue,
                Role: staffRoles.find(o2 => o2.id === newValue)
              }
            };
          }
          return o;
        });
        return newAccountStaffs;
      });
      snackbar.enqueueSnackbar(`Changed staff's role successfully!`, {
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
      <ConfirmLockAccountStaff
        account={modalConfirmLockAccount}
        onClose={() => setModalConfirmLockAccount(null)}
        onConfirm={handleOnConfirmLockAccountStaff}
      />
      <ChangeAccountStaffPassword
        account={modalChangeAccountPassword}
        onClose={() => setModalChangeAccountPassword(null)}
        onConfirm={handleOnSubmitChangeAccountPassword}
      />
      {/* end MODALS */}
      <AccountStaffFilterFormWrapper formFuncs={filterFormFuncs} submitted={handleOnSubmit}>
        <AccountStaffFilterForm
          // Status
          isLoading={isLoadingFilterForm || isLoadingAccountStaffs || isUpdating}
          // Variables
          initialFilters={initialFilters}
          // Functions / Handlers
          filtersReloaded={handleFiltersReload}
        />
      </AccountStaffFilterFormWrapper>
      <AccountStaffList
        // Status
        loading={isLoadingAccountStaffs}
        success={isSuccessAccountStaffs}
        // Variables
        tableHead={tableHead}
        items={!isLoadingAccountStaffs ? accountStaffs : []}
        filters={filters}
        pagination={pagination}
        // Functions / Handlers
        changedPage={handleChangePage}
        changedRowsPerPage={handleChangeRowsPerPage}
        changedSort={handleChangeSort}
        // Action Handlers
        rowActions={{
          toggleLock: account => setModalConfirmLockAccount(account),
          changePassword: account => setModalChangeAccountPassword(account),
          changeRole: handleOnSubmitChangeStaffRole
        }}
        rowActionsDisabled={isUpdating}
        // Others
        passingRef={topRef}
      />
    </>
  );
};

export default ViewAccountStaffsCtn;

// PropTypes
ViewAccountStaffsCtn.propTypes = {
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
const AccountStaffFilterFormWrapper = styled(FormWrapper)`
  margin-bottom: 1rem;
  ${templates.EVENLY_SPACED}
`;
