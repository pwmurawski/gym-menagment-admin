import { useContext, useEffect, useState } from "react";
import HomeContext from "../context/HomeContext";
import { fetchEditCustomer } from "../api/queryCustomers";

const useEditCustomer = (initialState, customerData) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const homeCon = useContext(HomeContext);
  const dispatch = homeCon?.dispatchH;
  const [newCustomerData, setNewCustomerData] = useState(initialState);

  const editCustomer = async () => {
    const res = await fetchEditCustomer(
      customerData.id,
      newCustomerData,
      signal
    );

    if (res?.msg.success) {
      dispatch({
        type: "editCustomer",
        id: res.customer.id,
        newCustomerData: res.customer,
      });
    }
  };

  useEffect(() => {
    if (customerData.id) {
      setNewCustomerData({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        number: customerData.number,
        discountId: customerData.discount.id,
        code: customerData.ticket.code,
        ticketType: customerData.ticket.ticketTypeId,
      });
    }
  }, [customerData.id]);

  return [newCustomerData, setNewCustomerData, editCustomer];
};

export default useEditCustomer;
