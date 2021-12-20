import { useContext, useEffect, useState } from "react";
import styles from "./Ticket.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Tickets from "../../components/Tickets/Tickets";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import AddTicketForm from "../../components/AddTicketForm/AddTicketForm";
import ReducerContext from "../../context/Context";
import FetchApi from "../../helpers/fetchApi";

export default function Ticket() {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const stateGlobal = useContext(ReducerContext);

  const fetchTickets = async (signal) => {
    FetchApi(
      "/ticket",
      {
        signal,
      },
      (res) => {
        setTicketsArray(res.tickets);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetchTickets(signal);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
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
            <CustomersTableHead
              headers={["Nazwa", "Cena", "Okres", "Status"]}
            />
            <CustomersTableBody>
              <Tickets
                ticketsArray={ticketsArray}
                setTicketsArray={setTicketsArray}
              />
            </CustomersTableBody>
          </CustomersTable>
        </div>
      )}
    </div>
  );
}
