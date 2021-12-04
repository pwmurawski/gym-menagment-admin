import styles from './Ticket.module.css';
import CustomersTable from '../../components/CustomersTable/CustomersTable';
import CustomersTableHead from '../../components/CustomersTable/CustomersTableHead/CustomersTableHead';
import CustomersTableBody from '../../components/CustomersTable/CustomersTableBody/CustomersTableBody';
import { useEffect, useState } from 'react';
import Tickets from '../../components/Tickets/Tickets';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import AddTicketForm from '../../components/AddTicketForm/AddTicketForm';

export default function Ticket() {

    const [ticketsArray, setTicketsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async (signal) => {
        try {
            const request = await fetch('/ticket', {
                signal: signal
            });
            const res = await request.json();

            setTicketsArray(res.tickets);
            setLoading(false);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchTickets(signal);
        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <>
            {loading ? <LoadingIcon /> : (
                <div className={styles.pageContainer}>
                    <h2>Karnety:</h2>
                    <AddTicketForm ticketsArray={ticketsArray} setTicketsArray={setTicketsArray} />

                    <CustomersTable>
                        <CustomersTableHead headers={['Nazwa', 'Cena', 'Okres', 'Status']} />
                        <CustomersTableBody>
                            <Tickets ticketsArray={ticketsArray} setTicketsArray={setTicketsArray} />
                        </CustomersTableBody>
                    </CustomersTable>
                </div>
            )}
        </>
    );
}