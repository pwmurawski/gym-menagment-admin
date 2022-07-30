import { useEffect, useState } from "react";
import { fetchEditTicket } from "../api/queryTickets";

const useEditTicketForm = (ticketData, setTicketData) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [newTicketData, setNewTicketData] = useState({
    id: null,
    name: "",
    price: "",
    activeDays: "",
    status: false,
  });

  useEffect(() => {
    if (ticketData.id) {
      setNewTicketData(ticketData);
    }
  }, [ticketData.id]);

  const editTicket = async () => {
    const res = await fetchEditTicket(newTicketData, signal);

    if (res.msg.success) {
      setTicketData(newTicketData);
    }
  };

  return [newTicketData, setNewTicketData, editTicket];
};

export default useEditTicketForm;
