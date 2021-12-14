import PropTypes from "prop-types";
import Customer from "./Customer/Customer";

const propTypes = {
  customersArray: PropTypes.array.isRequired,
  setCustomersArray: PropTypes.func.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
};

export default function Customers({
  customersArray,
  setCustomersArray,
  discountArray,
  ticketArray,
}) {
  return (
    <>
      {customersArray.map((customer) => (
        <Customer
          key={customer.id}
          id={customer.id}
          customersArray={customersArray}
          setCustomersArray={setCustomersArray}
          discountArray={discountArray}
          ticketArray={ticketArray}
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
