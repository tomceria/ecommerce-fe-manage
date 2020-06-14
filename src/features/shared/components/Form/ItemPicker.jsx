import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react";
import iconSearch from "@iconify/icons-bx/bx-search";
import iconExpand from "@iconify/icons-bx/bx-chevron-down";
import iconCollapse from "@iconify/icons-bx/bx-chevron-up";
import { useTranslation } from "react-i18next";

import Button from "./Button";
import { TextFieldStyled } from "./Input";
import Modal from "../UI/Modal";
import Table from "../Data/Table";
import { remScale } from "../../../../styles/variables/size.style";
import { colors } from "../../../../styles/variables/colors.style";
import { templates } from "../../../../styles/stylings/stylings.style";

export const LISTNAMES = {
  ACCOUNTUSERS: "LIST_ACCOUNTUSERS",
  ACCOUNTSTAFF: "LIST_ACCOUNTSTAFF",
  ACCOUNTSTAFF_MERCHANDISER: "LIST_ACCOUNTSTAFF_MERCHANDISER",
  ACCOUNTSTAFF_SUPPORT: "LIST_ACCOUNTSTAFF_SUPPORT",
  PRODUCTS: "LIST_PRODUCTS",
  INVENTORY: "LIST_INVENTORY"
};

const prepareList = (t, listName) => {
  const listConsts = {
    label: ""
  };
  switch (listName) {
    case LISTNAMES.ACCOUNTUSERS: {
      listConsts.label = t("UI.FORM.SELECT_USER");
      listConsts.url = "/accountUser";
      listConsts.resultName = "accounts";
      listConsts.selectingIdentifier = "User.id";
      listConsts.tableHead = [
        { id: "User.id", label: t("MODELLING.COMMON.USERID"), noSort: true },
        { id: "username", label: t("MODELLING.COMMON.USERNAME"), noSort: true },
        { id: "email", label: t("MODELLING.COMMON.EMAIL"), noSort: true },
        { id: "User.Info.lastName", label: t("MODELLING.COMMON.LASTNAME"), noSort: true },
        { id: "User.Info.firstName", label: t("MODELLING.COMMON.FIRSTNAME"), noSort: true }
      ];
      break;
    }
    case LISTNAMES.ACCOUNTSTAFF: {
      listConsts.label = t("UI.FORM.SELECT_STAFF");
      listConsts.url = "/accountStaff";
      listConsts.resultName = "accounts";
      listConsts.selectingIdentifier = "Staff.id";
      listConsts.tableHead = [
        { id: "Staff.id", label: t("MODELLING.COMMON.STAFFID"), noSort: true },
        { id: "username", label: t("MODELLING.COMMON.USERNAME"), noSort: true },
        { id: "email", label: t("MODELLING.COMMON.EMAIL"), noSort: true },
        { id: "Staff.Role.name", label: t("MODELLING.COMMON.ROLE"), noSort: true }
      ];
      break;
    }
    case LISTNAMES.ACCOUNTSTAFF_MERCHANDISER: {
      listConsts.label = t("UI.FORM.SELECT_MERCHANDISER");
      listConsts.url = "/accountStaff?roleId=merchandiser";
      listConsts.resultName = "accounts";
      listConsts.selectingIdentifier = "Staff.id";
      listConsts.tableHead = [
        { id: "Staff.id", label: t("MODELLING.COMMON.STAFFID"), noSort: true },
        { id: "username", label: t("MODELLING.COMMON.USERNAME"), noSort: true },
        { id: "email", label: t("MODELLING.COMMON.EMAIL"), noSort: true }
      ];
      break;
    }
    case LISTNAMES.ACCOUNTSTAFF_SUPPORT: {
      listConsts.label = t("UI.FORM.SELECT_SUPPORT");
      listConsts.url = "/accountStaff?roleId=support";
      listConsts.resultName = "accounts";
      listConsts.selectingIdentifier = "Staff.id";
      listConsts.tableHead = [
        { id: "Staff.id", label: t("MODELLING.COMMON.STAFFID"), noSort: true },
        { id: "username", label: t("MODELLING.COMMON.USERNAME"), noSort: true },
        { id: "email", label: t("MODELLING.COMMON.EMAIL"), noSort: true }
      ];
      break;
    }
    case LISTNAMES.PRODUCTS: {
      listConsts.label = t("UI.FORM.SELECT_PRODUCT");
      listConsts.url = "/items";
      listConsts.resultName = "items";
      listConsts.selectingIdentifier = "id";
      listConsts.tableHead = [
        { id: "id", label: t("MODELLING.COMMON.ID"), noSort: true },
        { id: "name", label: t("MODELLING.COMMON.NAME"), noSort: true }
      ];
      break;
    }
    case LISTNAMES.INVENTORY: {
      listConsts.label = t("UI.FORM.SELECT_INVENTORY");
      listConsts.url = "/inventories";
      listConsts.resultName = "inventories";
      listConsts.selectingIdentifier = "id";
      listConsts.tableHead = [
        { id: "id", label: t("INVENTORY.MODEL.ID.LABEL"), noSort: true },
        { id: "Item.name", label: t("INVENTORY.MODEL.ITEMID.LABEL"), noSort: true },
        { id: "Variation.name", label: t("INVENTORY.LABEL.VARIATIONNAME"), noSort: true },
        { id: "Variation.id", label: t("INVENTORY.LABEL.VARIATIONID"), noSort: true },
        { id: "available", label: t("INVENTORY.MODEL.AVAILABLE.LABEL"), noSort: true },
        { id: "bought", label: t("INVENTORY.MODEL.BOUGHT.LABEL"), noSort: true }
      ];
      listConsts.listTransform = items => {
        return items.map(item => {
          const newItem = JSON.parse(JSON.stringify(item));
          newItem.available = newItem.available ? (
            <b>{t("MODELLING.COMMON.YES")}</b>
          ) : (
            <span style={{ color: "red" }}>{t("MODELLING.COMMON.NO")}</span>
          );
          newItem.bought = newItem.bought ? (
            <span style={{ color: "red" }}>{t("MODELLING.COMMON.YES")}</span>
          ) : (
            <b>{t("MODELLING.COMMON.NO")}</b>
          );
          return newItem;
        });
      };
      break;
    }
    default: {
      break;
    }
  }
  return listConsts;
};

const ItemPicker = ({
  // Form Identifier
  name,
  label,
  // react-hook-form Props
  error,
  control,
  rules,
  defaultValue,
  // Field properties
  multiple,
  small,
  listName,
  // Handlers
  changed,
  // Others
  errormessage,
  disabled,
  style,
  className
}) => {
  const { t } = useTranslation();

  const listConsts = prepareList(t, listName);

  const [isInModal, setIsInModal] = useState(false);
  // Selected item list
  const [selecteds, setSelecteds] = useState([]);
  const [selectings, setSelectings] = useState([]);
  // UI states
  const [isExpanded, setIsExpand] = useState(false);
  // Item List states
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tempQuery, setTempQuery] = useState("");
  const [filters, setFilters] = useState({
    query: "",
    page: 1,
    size: 25,
    sort: "createdAt",
    sortDesc: true
  });

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(listConsts.url, { withCredentials: true, params: filters });
        let fetchedItems = result.data[listConsts.resultName];
        fetchedItems = fetchedItems.map(item => {
          const newItem = JSON.parse(JSON.stringify(item));
          newItem.id = _.get(newItem, listConsts.selectingIdentifier);
          return newItem;
        });
        setItems(listConsts.listTransform ? listConsts.listTransform(fetchedItems) : fetchedItems);
        setPagination(result.data.pagination);
      } catch (e) {
        setItems([]);
        setPagination({});
      }
      setIsLoading(false);
    };
    fetchItems();
  }, [filters]); // eslint-disable-line

  // Set "selecteds" state on form value change / on defaultValue
  useEffect(() => {
    let newSelecteds = [];
    if (multiple) {
      newSelecteds = JSON.parse(control.getValues()[name]);
    } else {
      newSelecteds = [control.getValues()[name]];
    }
    setSelectings(newSelecteds);
    setSelecteds(newSelecteds);
  }, [control.getValues()[name]]); // eslint-disable-line

  const handleOnModalOpen = () => {
    setIsInModal(true);
  };

  const handleOnModalCancel = () => {
    setSelectings(selecteds);
    setIsInModal(false);
  };

  const handleItemClick = (event, item) => {
    if (multiple) {
      if (selectings.includes(item.id)) {
        setSelectings(prevState => prevState.filter(o => o !== item.id));
      } else {
        setSelectings(prevState => [...prevState, item.id]);
      }
    } else {
      setSelectings([item.id]);
    }
  };

  const handleOnFilterSubmit = () => {
    setFilters(prevState => ({
      ...prevState,
      query: tempQuery
    }));
  };

  const handleOnConfirm = () => {
    setSelecteds(selectings);
    if (multiple) {
      control.setValue(name, JSON.stringify(selectings));
    } else if (selectings[0]) {
      // single
      control.setValue(name, selectings[0]);
    } else {
      // single no value
      control.setValue(name, "");
    }
    control.triggerValidation(name);
    setIsInModal(false);
    // Trigger "changed" handler
    if (changed) {
      changed();
    }
  };

  return (
    <FieldContainer className={className}>
      {/* MODAL */}
      <Modal
        in={isInModal}
        title={`${multiple ? t("UI.FORM.SELECT_MULTIPLE") : t("UI.FORM.SELECT_ONE")} ${
          listConsts.label
        }`}
        onClose={handleOnModalCancel}
      >
        <div>
          <div>
            <FilterFormWrapper>
              <div>
                <TextFieldStyled
                  label={t("MODELLING.COMMON.QUERY")}
                  value={tempQuery}
                  onChange={e => setTempQuery(e.target.value)}
                  disabled={isLoading}
                  variant="outlined"
                  size="small"
                  style={{ flexGrow: 1 }}
                />
                <Button
                  type="button"
                  color="primary"
                  onClick={handleOnFilterSubmit}
                  disabled={isLoading}
                >
                  <Icon icon={iconSearch} />
                </Button>
              </div>
              <div>
                <Button onClick={handleOnConfirm} style={{ flexGrow: 1 }}>
                  {t("FORM.COMMON.CONFIRM")}
                </Button>
              </div>
            </FilterFormWrapper>
          </div>
          <Table
            // Status
            loading={isLoading}
            // Variables
            tableHead={listConsts.tableHead}
            items={items}
            filters={filters}
            pagination={pagination}
            // Functions / Handlers
            onChangePage={page => {
              setFilters(prevState => ({ ...prevState, page }));
            }}
            onChangeRowsPerPage={event => {
              setFilters(prevState => ({
                ...prevState,
                page: 1,
                size: parseInt(event.target.value, 10)
              }));
            }}
            onChangeSort={() => {}}
            // Picking
            onItemClick={handleItemClick}
            isPicking={multiple ? "multiple" : "single"}
            selectings={selectings}
            // Others
            passingRef={null}
          />
        </div>
      </Modal>
      {/* Button Display */}
      {!small && <p>{label}</p>}
      <ItemPickerStyled style={style} className={error && "error"} small={small}>
        <div>
          <div>
            {small && (
              <span style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}>
                {`${label}: `}
              </span>
            )}
            {!small && (
              <Button onClick={handleOnModalOpen} disabled={disabled}>
                {`${t("UI.FORM.BROWSE")}...`}
              </Button>
            )}
            <span className="valueDisplay">
              {selecteds.length > 0 && (
                <p>
                  <b>{selecteds[0]}</b>
                  {selecteds.length > 1 && ` and ${selecteds.length - 1} more`}
                </p>
              )}
            </span>
            {small && (
              <Button
                onClick={handleOnModalOpen}
                disabled={disabled}
                style={{ marginLeft: "1rem" }}
              >
                {`${t("UI.FORM.BROWSE")}...`}
              </Button>
            )}
          </div>
          {multiple && !small && (
            <div>
              <Button onClick={() => setIsExpand(prevState => !prevState)}>
                <Icon icon={isExpanded ? iconCollapse : iconExpand} />
              </Button>
            </div>
          )}
        </div>
        <div>
          <Collapse in={isExpanded} mountOnEnter unmountOnExit timeout={0}>
            <List>
              {selecteds.map(s => (
                <ListItem key={s}>
                  <ListItemText primary={s} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      </ItemPickerStyled>
      <p className="errorMsg">{error && errormessage}</p>
      {/* react-hook-form Controller */}
      <Controller
        // Form Identifier
        name={name}
        // react-hook-form Props
        as={<input type="text" disabled style={{ display: "none" }} />}
        control={control}
        rules={rules}
        defaultValue={
          // eslint-disable-next-line
          multiple ? (defaultValue && defaultValue.value ? defaultValue.value : "[]") : defaultValue
        }
      />
    </FieldContainer>
  );
};

export default ItemPicker;

// PropTypes
ItemPicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // react-hook-form Props
  error: PropTypes.bool,
  control: PropTypes.shape({
    setValue: PropTypes.func,
    triggerValidation: PropTypes.func,
    getValues: PropTypes.func
  }).isRequired,
  rules: PropTypes.shape({}),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
      object: PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  // Field Properties
  multiple: PropTypes.bool,
  small: PropTypes.bool,
  listName: PropTypes.string.isRequired,
  // Handlers
  changed: PropTypes.func,
  // Others
  errormessage: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  className: PropTypes.string
};
ItemPicker.defaultProps = {
  // react-hook-form Props
  error: undefined,
  rules: undefined,
  defaultValue: undefined,
  // Field Properties
  multiple: undefined,
  small: undefined,
  // Handlers
  changed: undefined,
  // Others
  errormessage: "",
  disabled: undefined,
  style: {},
  className: undefined
};

// Styles
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .label {
    margin-bottom: 1rem;
  }

  & > .errorMsg {
    color: ${colors.scheme.error.normal};
    margin: ${remScale(4)} ${remScale(14)} 0;
    font-size: 0.75rem;
  }
`;

const ItemPickerStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  align-items: center;
  ${props =>
    !props.small &&
    `
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  background: ${colors.white};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  `}

  &.error {
    box-shadow: 0 0 5px 2px ${colors.scheme.error.light};
    border: 1px solid ${colors.scheme.error.normal};
  }

  & > * {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  & > * > * {
    display: flex;
  }

  & .valueDisplay {
    display: flex;
    align-items: center;
  }

  & .valueDisplay > * {
    margin: 0;
    margin-left: 1rem;
  }
`;

const FilterFormWrapper = styled.div`
  margin-bottom: 1rem;

  ${templates.EVENLY_SPACED}

  justify-content: space-between;
`;
