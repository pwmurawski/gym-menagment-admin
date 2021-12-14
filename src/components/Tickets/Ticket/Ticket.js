import PropTypes from "prop-types";
import { useState } from "react";

const propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  activeDays: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
};

export default function Ticket({ name, price, activeDays, status }) {
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
          <td>edit</td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{`${price} zł`}</td>
          <td>{`${activeDays} ${activeDays === 1 ? "dzień" : "dni"}`}</td>
          <td>{`${status}`}</td>
        </>
      )}
    </tr>
  );
}

Ticket.propTypes = propTypes;
