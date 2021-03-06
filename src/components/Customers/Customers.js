import PropTypes from "prop-types";
import Customer from "./Customer/Customer";

const propTypes = {
  customersArray: PropTypes.array.isRequired,
};

export default function Customers({ customersArray }) {
  return (
    <>
      {customersArray.map((customer) => (
        <Customer
          key={customer.id}
          id={customer.id}
          firstName={customer.firstName}
          lastName={customer.lastName}
          number={customer.number}
          ticket={customer.ticket}
          discount={customer.discount}
        />
      ))}
    </>
  );
}

Customers.propTypes = propTypes;
