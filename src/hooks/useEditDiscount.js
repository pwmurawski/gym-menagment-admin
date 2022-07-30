import { useEffect, useState } from "react";
import { fetchEditDiscount } from "../api/queryDiscounts";

const useEditDiscount = (discountData, setDiscountData) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [newDiscountData, setNewDiscountData] = useState({
    id: null,
    name: "",
    discount: "",
    status: false,
  });

  const editDiscount = async () => {
    const res = await fetchEditDiscount(newDiscountData, signal);

    if (res.msg.success) {
      setDiscountData(newDiscountData);
    }
  };

  useEffect(() => {
    if (discountData.id) {
      setNewDiscountData(discountData);
    }
  }, [discountData.id]);

  return [newDiscountData, setNewDiscountData, editDiscount];
};

export default useEditDiscount;
