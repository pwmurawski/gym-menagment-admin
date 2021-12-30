import PropTypes from "prop-types";
import Ticket from "./Ticket/Ticket";

const propTypes = {
  ticketsArray: PropTypes.array.isRequired,
  setTicketsArray: PropTypes.func.isRequired,
};

export default function Tickets({ ticketsArray, setTicketsArray }) {
  return (
    <>
      {ticketsArray.map((ticket) => (
        <Ticket
          key={ticket.id}
          id={ticket.id}
          name={ticket.name}
          price={ticket.price}
          activeDays={ticket.activeDays}
          status={ticket.status}
          ticketsArray={ticketsArray}
          setTicketsArray={setTicketsArray}
        />
      ))}
    </>
  );
}

Tickets.propTypes = propTypes;
