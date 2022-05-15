import fetch from "./fetchApi";

export const fetchTickets = (signal) => {
  return fetch("/ticket", {
    signal,
  });
};

export const fetchAddTicket = (ticketData, signal) => {
  return fetch("/ticket/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(ticketData),
  });
};

export const fetchEditTicket = (newTicketData, signal) => {
  return fetch("/ticket/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify(newTicketData),
  });
};
