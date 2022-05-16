import fetchApi from "./fetchApi";

export const fetchTickets = (signal) => {
  return fetchApi("/ticket", {
    signal,
  });
};

export const fetchAddTicket = (ticketData, signal) => {
  return fetchApi("/ticket/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(ticketData),
  });
};

export const fetchEditTicket = (newTicketData, signal) => {
  return fetchApi("/ticket/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newTicketData),
  });
};
