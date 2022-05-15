import { useContext } from "react";
import HomeContext from "../../context/HomeContext";
import Customer from "./Customer/Customer";

export default function Customers() {
  const homeCon = useContext(HomeContext);
  const { customersArray } = homeCon.state;

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
