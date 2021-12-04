import { useEffect, useState } from 'react';
import styles from './EditCustomer.module.css';

export default function EditCustomer(props) {
    const [discounts, setDiscounts] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [customerData, setCustomerData] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        number: props.number,
        discountId: props.discount.id,
        code: props.ticket.code,
        ticketType: props.ticket.ticketTypeId
    });

    const fetchDiscount = async (signal) => {
        try {
            const response = await fetch('/discount', {
                signal: signal
            });
            const res = await response.json();

            setDiscounts(res.discounts);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    const fetchTicket = async (signal) => {
        try {
            const response = await fetch('/ticket', {
                signal: signal
            });
            const res = await response.json();

            setTickets(res.tickets);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    const submit = async (signal) => {
        try {
            const response = await fetch(`/customer/${props.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: signal,
                body: JSON.stringify(customerData)
            });
            const res = await response.json();

            if (res.msg.success) {
                props.customersArray.forEach(element => {
                    if (element.id === props.id) {
                        element.id = res.customer.id;
                        element.firstName = res.customer.firstName;
                        element.lastName = res.customer.lastName;
                        element.number = res.customer.number;
                        element.ticket = res.customer.ticket;
                        element.discount = res.customer.discount;
                    }
                });
                props.setCustomersArray([...props.customersArray]);
                props.setShowEditCustomer(false);
            }
            setIsSubmit(false);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        fetchTicket(signal);
        fetchDiscount(signal);
        return () => {
            abortController.abort();
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (isSubmit) {
            submit(signal);
        }

        return () => {
            abortController.abort();
        }
    }, [isSubmit]);

    return (
        <>
            <td>
                <input value={customerData.firstName} onChange={e => setCustomerData({ ...customerData, firstName: e.target.value })} placeholder='Imie' className={`${styles.form__input} ${styles.form__input_first}`} type='text' />
            </td>
            <td>
                <input value={customerData.lastName} onChange={e => setCustomerData({ ...customerData, lastName: e.target.value })} placeholder='Nazwisko' className={styles.form__input} type='text' />
            </td>
            <td>
                <input value={customerData.number} onChange={e => setCustomerData({ ...customerData, number: e.target.value })} placeholder='Numer' className={styles.form__input} type='text' />
            </td>
            <td>
                <input value={customerData.code} onChange={e => setCustomerData({ ...customerData, code: e.target.value })} placeholder='Code' className={styles.form__input} type='text' />
            </td>
            <td>
                <select value={customerData.ticketType} onChange={e => setCustomerData({ ...customerData, ticketType: e.target.value })} className={styles.form__select} name='ticket'>
                    <option>Karnet</option>
                    {tickets.map(ticket => <option key={ticket.id} value={ticket.id} price={ticket.price} activedays={ticket.activeDays} disabled={!ticket.status}>{`${ticket.name} | ${ticket.activeDays} ${ticket.activeDays === 1 ? 'dzień' : 'dni'} | ${ticket.price}zł`}</option>)}
                </select>
            </td>
            <td>
                <select value={customerData.discountId} onChange={e => setCustomerData({ ...customerData, discountId: e.target.value })} className={styles.form__select} name='discount'>
                    <option>Znizka</option>
                    {discounts.map(discount => <option key={discount.id} value={discount.id} discount={discount.discount} disabled={!discount.status}>{`${discount.name} | ${discount.discount}%`}</option>)}
                </select>
            </td>
            <td>
                <button onClick={() => { setIsSubmit(true) }} className={styles.form__submitBtn}>
                    Edytuj
                </button>
                <button onClick={() => { props.setShowEditCustomer(false) }} className={styles.form__deleteBtn}>
                    Usun
                </button>
                <button onClick={() => { props.setShowEditCustomer(false) }} className={styles.form__exitBtn}>
                    Wyjdz
                </button>
            </td>
        </>
    );
}