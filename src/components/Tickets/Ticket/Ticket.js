import PropTypes from "prop-types";
import { useContext, useState } from "react";
import styles from "./Ticket.module.css";
import ReducerContext from "../../../context/Context";
import EditTicketForm from "../EditTicketForm/EditTicketForm";
import useInitStateProps from "../../../hooks/useInitStateProps";

const propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  activeDays: PropTypes.any.isRequired,
  status: PropTypes.bool.isRequired,
};

export default function Ticket({ id, name, price, activeDays, status }) {
  const stateGlobal = useContext(ReducerContext);
  const [showEditTicket, setShowEditTicket] = useState(false);
  const [ticketData, setTicketData] = useInitStateProps(id, {
    id,
    name,
    price,
    activeDays,
    status,
  });

  return (
    <tr
      onDoubleClick={() => {
        setShowEditTicket(true);
      }}
      className={`${styles.ticket} ${styles[stateGlobal.state.theme] ?? ""} ${
        showEditTicket ? styles.editTicket : null
      }`}
    >
      {showEditTicket ? (
        <EditTicketForm
          ticketData={ticketData}
          setTicketData={setTicketData}
          setShowEditTicket={setShowEditTicket}
        />
      ) : (
        <>
          <td>{ticketData.name}</td>
          <td>{`${ticketData.price} zł`}</td>
          <td>{`${ticketData.activeDays} ${
            parseFloat(ticketData.activeDays) === 1 ? "dzień" : "dni"
          }`}</td>
          <td className={styles.container__ticketStatus}>
            <div
              className={`${styles.ticket__status} ${
                ticketData.status
                  ? styles.ticket__status_active
                  : styles.ticket__status_notActive
              }`}
            />
          </td>
        </>
      )}
    </tr>
  );
}

Ticket.propTypes = propTypes;
