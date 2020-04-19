import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  IconButton
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
  onChangePage,
  onChangeRowsPerPage,
  onChangeSort,
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
                        active={cell.id === filters.sort}
                        direction={filters.sortDesc ? "desc" : "asc"}
                        onClick={() => onChangeSort(cell.id)}
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
                <TableRow key={item.id}>
                  {tableHead.map(property => (
                    <TableCell key={property.id}>{item[property.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
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
  }).isRequired,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onChangeSort: PropTypes.func,
  passingRef: PropTypes.shape({}),
  className: PropTypes.string
};
Table.defaultProps = {
  onChangePage: () => {},
  onChangeRowsPerPage: () => {},
  onChangeSort: () => {},
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
