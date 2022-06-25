import React from "react";
import PropTypes from "prop-types";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ items, columns }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.object
};

export default Table;
