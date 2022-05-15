import fetch from "./fetchApi";

export const fetchDiscounts = (signal) => {
  return fetch("/discount", {
    signal,
  });
};

export const fetchAddDiscount = (discountData, signal) => {
  return fetch("/discount/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(discountData),
  });
};

export const fetchEditDiscount = (newDiscountData, signal) => {
  return fetch("/discount/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newDiscountData),
  });
};
