import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSearchCustomer } from "../api/queryCustomers";
import HomeContext from "../context/HomeContext";

const useSearchCustomer = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const { term } = useParams();
  const [loading, setLoading] = useState(true);
  const homeReducer = useContext(HomeContext);
  const dispatch = homeReducer.dispatchH;
  const { customersArray } = homeReducer.stateH;

  const search = async () => {
    const res = await fetchSearchCustomer(term, signal);
    if (res) {
      dispatch({ type: "setCustomersArray", customers: res.customers });
      setLoading(false);
    }
  };

  useEffect(() => {
    search();

    return () => {
      abortController.abort();
    };
  }, [term]);

  return [customersArray, loading];
};

export default useSearchCustomer;
