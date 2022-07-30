import { useState, useEffect, useContext } from "react";
import { fetchAddCustomer } from "../api/queryCustomers";
import HomeContext from "../context/HomeContext";

const useAddCustomer = (initFormData, tablePage) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const homeCon = useContext(HomeContext);
  const dispatch = homeCon?.dispatchH;
  const [customerData, setCustomerData] = useState(initFormData);
  const [backendMsg, setBackendMsg] = useState(null);

  const addCustomer = async () => {
    const res = await fetchAddCustomer(customerData, signal);

    if (res?.msg.success) {
      setCustomerData(initFormData);
      setBackendMsg({
        msg: res.msg.success,
        status: true,
      });

      if (tablePage.currentPage !== tablePage.totalPages - 1) {
        dispatch({
          type: "addBeginCustomerNotLastPage",
          customer: res.customer,
        });
      } else {
        dispatch({
          type: "addBeginCustomer",
          customer: res.customer,
        });
      }
    }

    if (res?.msg.error) {
      setBackendMsg({
        msg: res.msg.error,
        status: false,
      });
    }
  };

  useEffect(() => {
    if (backendMsg) {
      const timeOut = setTimeout(() => {
        setBackendMsg(null);
      }, 5000);
      return () => {
        clearTimeout(timeOut);
      };
    }

    return null;
  }, [backendMsg]);

  return [customerData, setCustomerData, addCustomer, backendMsg];
};

export default useAddCustomer;
