import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
  name: PropTypes.string.isRequired,
  discount: PropTypes.any.isRequired,
  status: PropTypes.any.isRequired,
};

export default function Discount({ name, discount, status }) {
  const [showEditCustomer, setShowEditCustomer] = useState(false);

  return (
    <tr
      onDoubleClick={() => {
        setShowEditCustomer(true);
      }}
    >
      {showEditCustomer ? (
        <>
          <td>edit</td>
          <td>edit</td>
          <td>edit</td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{`${discount}%`}</td>
          <td>{`${status}`}</td>
        </>
      )}
    </tr>
  );
}

Discount.propTypes = propTypes;
