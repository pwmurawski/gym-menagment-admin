import fetchApi from "./fetchApi";

export const fetchDiscounts = (signal) => {
  return fetchApi("/discount", {
    signal,
  });
};

export const fetchAddDiscount = (discountData, signal) => {
  return fetchApi("/discount/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(discountData),
  });
};

export const fetchEditDiscount = (newDiscountData, signal) => {
  return fetchApi("/discount/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newDiscountData),
  });
};
