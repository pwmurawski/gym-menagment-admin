import fetch from "./fetchApi";

export const fetchCustomersPage = (currentPage, signal) => {
  return fetch(`/customer?page=${currentPage}`, { signal });
};

export const fetchAddCustomer = (customerData, signal) => {
  return fetch("/customer/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(customerData),
  });
};

export const fetchEditCustomer = (id, newCustomerData, signal) => {
  return fetch(`/customer/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newCustomerData),
  });
};

export const fetchDeleteCustomer = (id, signal) => {
  return fetch(`/customer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
};

export const fetchSearchCustomer = (term, signal) => {
  return fetch(`/customer/search?q=${term}`, {
    signal,
  });
};
