import PropTypes from "prop-types";
import Customer from "./Customer/Customer";

const propTypes = {
  customersArray: PropTypes.array.isRequired,
  discountArray: PropTypes.array.isRequired,
  ticketArray: PropTypes.array.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

export default function Customers({
  customersArray,
  discountArray,
  ticketArray,
  deleteCustomer,
}) {
  return (
    <>
      {customersArray.map((customer) => (
        <Customer
          key={customer.id}
          customerDataProps={{
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            number: customer.number,
            ticket: customer.ticket,
            discount: customer.discount,
          }}
          discountArray={discountArray}
          ticketArray={ticketArray}
          deleteCustomer={deleteCustomer}
        />
      ))}
    </>
  );
}

Customers.propTypes = propTypes;
