import Ticket from './Ticket/Ticket';

export default function Tickets(props) {
    return (
        <>
            {props.ticketsArray.map(ticket => <Ticket key={ticket.id} ticketsArray={props.ticketsArray} setTicketsArray={props.setTicketsArray} {...ticket} />)}
        </>
    );
}