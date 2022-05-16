import fetchApi from "./fetchApi";

export const fetchCustomersPage = (currentPage, signal) => {
  return fetchApi(`/customer?page=${currentPage}`, { signal });
};

export const fetchAddCustomer = (customerData, signal) => {
  return fetchApi("/customer/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(customerData),
  });
};

export const fetchEditCustomer = (id, newCustomerData, signal) => {
  return fetchApi(`/customer/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newCustomerData),
  });
};

export const fetchDeleteCustomer = (id, signal) => {
  return fetchApi(`/customer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
};

export const fetchSearchCustomer = (term, signal) => {
  return fetchApi(`/customer/search?q=${term}`, {
    signal,
  });
};
