import { useEffect, useState } from "react";
import { fetchDiscounts } from "../api/queryDiscounts";

const useDiscounts = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [discountsArray, setDiscountsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDiscounts = async () => {
    const res = await fetchDiscounts(signal);

    if (res?.discounts) {
      setDiscountsArray(res.discounts);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiscounts();

    return () => {
      abortController.abort();
    };
  }, []);

  return [discountsArray, setDiscountsArray, loading];
};

export default useDiscounts;
