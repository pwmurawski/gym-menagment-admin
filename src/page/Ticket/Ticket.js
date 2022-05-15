import { useContext, useEffect, useState } from "react";
import styles from "./Ticket.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Tickets from "../../components/Tickets/Tickets";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import AddTicketForm from "../../components/Tickets/AddTicketForm/AddTicketForm";
import ReducerContext from "../../context/Context";
import { fetchTickets } from "../../api/queryTickets";

export default function Ticket() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [ticketsArray, setTicketsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const stateGlobal = useContext(ReducerContext);

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

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div
      className={`${styles.pageContainer} ${
        styles[stateGlobal.state.theme] ?? ""
      }`}
    >
      <h2>Karnety:</h2>
      <AddTicketForm
        ticketsArray={ticketsArray}
        setTicketsArray={setTicketsArray}
      />

      <CustomersTable>
        <CustomersTableHead headers={["Nazwa", "Cena", "Okres", "Status"]} />
        <CustomersTableBody>
          <Tickets ticketsArray={ticketsArray} />
        </CustomersTableBody>
      </CustomersTable>
      {ticketsArray.length === 0 ? (
        <h3 className={styles.messageEmptyCustomers}>Brak karnetów</h3>
      ) : null}
    </div>
  );
}
