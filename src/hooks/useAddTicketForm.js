import { useEffect, useState } from "react";
import { fetchAddTicket } from "../api/queryTickets";

const useAddTicketForm = (initFormData, ticketsArray, setTicketsArray) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [ticketData, setTicketData] = useState(initFormData);
  const [backendMsg, setBackendMsg] = useState(null);

  const addTicket = async () => {
    const res = await fetchAddTicket(ticketData, signal);

    if (res.msg.success) {
      setTicketData(initFormData);
      setBackendMsg({
        msg: res.msg.success,
        status: true,
      });

      setTicketsArray([...ticketsArray, res.ticket]);
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

  return [ticketData, setTicketData, addTicket, backendMsg];
};

export default useAddTicketForm;
