import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import {
  Paper,
  TableContainer,
  Table as MaterialTable,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  IconButton,
  Radio,
  Checkbox
} from "@material-ui/core";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";

import LoadScreen from "../UI/LoadScreen";
import Fade from "../Transitions/Fade";
import stylings from "../../../../styles/stylings/stylings.style";
import { colors } from "../../../../styles/variables/colors.style";
import { remScale } from "../../../../styles/variables/size.style";

const Table = ({
  loading,
  tableHead,
  items,
  filters,
  pagination,
  // Handlers
  onChangePage,
  onChangeRowsPerPage,
  onChangeSort,
  // ItemPicker Props
  onItemClick,
  isPicking,
  selectings,
  // Others
  passingRef,
  className
}) => {
  return (
    <TableContainer component={Paper} ref={passingRef}>
      {loading && (
        <div style={{ height: "50vh" }}>
          <LoadScreen in moverHeight={100} />
        </div>
      )}
      {!loading && (
        <Fade in>
          <TableCtn className={className}>
            <TableHead>
              <TableRow>
                {isPicking && <TableCell style={{ width: remScale(15) }} />}
                {tableHead.map(cell => (
                  <TableCell
                    key={cell.id}
                    align={cell.align}
                    style={{ minWidth: remScale(cell.width) }}
                  >
                    {cell.noSort ? (
                      cell.label
                    ) : (
                      <TableSortLabel
                        active={(cell.sortId || cell.id) === filters.sort}
                        direction={filters.sortDesc ? "desc" : "asc"}
                        onClick={() => onChangeSort(cell.sortId || cell.id)}
                      >
                        {cell.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id} onClick={event => onItemClick(event, item)}>
                  {isPicking && (
                    <TableCell>
                      {isPicking === "multiple" && (
                        <Checkbox checked={selectings.includes(item.id)} />
                      )}
                      {isPicking !== "multiple" && <Radio checked={selectings.includes(item.id)} />}
                    </TableCell>
                  )}
                  {tableHead.map(property => (
                    // <TableCell key={property.id}>{item[property.id]}</TableCell>
                    <TableCell key={property.id}>{_.get(item, property.id)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {pagination && (
                  <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    colSpan={tableHead.length}
                    count={pagination.itemCount || 1}
                    rowsPerPage={pagination.pageSize || 1}
                    page={pagination.currentPage - 1}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true
                    }}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    ActionsComponent={() => (
                      <PaginationActionsDiv>
                        <IconButton
                          onClick={() => onChangePage(1)}
                          disabled={pagination.currentPage === 1}
                          aria-label="first page"
                        >
                          <FirstPageIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => onChangePage(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                          aria-label="previous page"
                        >
                          <KeyboardArrowLeft />
                        </IconButton>
                        <IconButton
                          onClick={() => onChangePage(pagination.currentPage + 1)}
                          disabled={pagination.currentPage >= pagination.pageCount}
                          aria-label="next page"
                        >
                          <KeyboardArrowRight />
                        </IconButton>
                        <IconButton
                          onClick={() => onChangePage(pagination.pageCount)}
                          disabled={pagination.currentPage >= pagination.pageCount}
                          aria-label="last page"
                        >
                          <LastPageIcon />
                        </IconButton>
                      </PaginationActionsDiv>
                    )}
                  />
                )}
              </TableRow>
            </TableFooter>
          </TableCtn>
        </Fade>
      )}
    </TableContainer>
  );
};

export default Table;

// PropTypes
Table.propTypes = {
  loading: PropTypes.bool.isRequired,
  tableHead: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number,
      noSort: PropTypes.bool
    })
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.shape({
    sort: PropTypes.string,
    sortDesc: PropTypes.bool
  }).isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    itemCount: PropTypes.number,
    pageCount: PropTypes.number
  }),
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangeSort: PropTypes.func,
  // ItemPicker Props
  onItemClick: PropTypes.func,
  isPicking: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectings: PropTypes.arrayOf(PropTypes.string),
  // Others
  passingRef: PropTypes.shape({}),
  className: PropTypes.string
};
Table.defaultProps = {
  pagination: undefined,
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  onChangeSort: () => {},
  onItemClick: () => {},
  // ItemPicker Props
  isPicking: undefined,
  selectings: [],
  // Others
  passingRef: {},
  className: ""
};

// Styles
const TableCtn = styled(MaterialTable)`
  & a {
    text-decoration: none;
  }
`;

const PaginationActionsDiv = styled.div`
  display: flex;

  @media (${stylings.mediaQuery.sm}) {
    & {
      position: absolute;
      left: 0;
      background: ${colors.white};
    }
  }
`;
