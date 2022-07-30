import { useEffect, useState } from "react";
import { fetchTickets } from "../api/queryTickets";

const useTickets = () => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [ticketsArray, setTicketsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTickets = async () => {
    const res = await fetchTickets(signal);

    if (res?.tickets) {
      setTicketsArray(res.tickets);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();

    return () => {
      abortController.abort();
    };
  }, []);

  return [ticketsArray, setTicketsArray, loading];
};

export default useTickets;
