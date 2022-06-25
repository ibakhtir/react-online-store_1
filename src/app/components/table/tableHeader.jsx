import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((col) => (
          <th key={col} scope="col">
            {columns[col].name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.object
};

export default TableHeader;
