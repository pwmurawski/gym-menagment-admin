import { useContext } from "react";
import HomeContext from "../context/HomeContext";
import { fetchDeleteCustomer } from "../api/queryCustomers";

const useDeleteCustomer = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const homeCon = useContext(HomeContext);
  const dispatch = homeCon?.dispatchH;

  const deleteCustomer = async (id) => {
    const res = await fetchDeleteCustomer(id, signal);

    if (res?.msg.success) {
      dispatch({ type: "deleteCustomer", id });
    }
  };

  return deleteCustomer;
};

export default useDeleteCustomer;
