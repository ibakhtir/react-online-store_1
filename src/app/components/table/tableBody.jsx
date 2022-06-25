import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ items, columns }) => {
  const renderContent = (item, col) => {
    if (columns[col].component) {
      const component = columns[col].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[col].path);
  };

  return (
    <tbody className="table-group-divider">
      {items &&
        items.map((item) => (
          <tr key={item._id}>
            {Object.keys(columns).map((col) => (
              <td key={col}>{renderContent(item, col)}</td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

TableBody.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.object
};

export default TableBody;
