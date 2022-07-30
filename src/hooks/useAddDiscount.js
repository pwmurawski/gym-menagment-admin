import { useEffect, useState } from "react";
import { fetchAddDiscount } from "../api/queryDiscounts";

const useAddDiscount = (initFormData, discountsArray, setDiscountsArray) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [discountData, setDiscountData] = useState(initFormData);
  const [backendMsg, setBackendMsg] = useState(null);

  const addDiscount = async () => {
    const res = await fetchAddDiscount(discountData, signal);

    if (res.msg.success) {
      setDiscountData(initFormData);
      setBackendMsg({
        msg: res.msg.success,
        status: true,
      });

      setDiscountsArray([...discountsArray, res.discount]);
    }

    if (res.msg.error) {
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

  return [discountData, setDiscountData, addDiscount, backendMsg];
};

export default useAddDiscount;
