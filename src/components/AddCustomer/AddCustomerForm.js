import { useEffect, useState } from 'react';
import styles from './AddCustomerForm.module.css';

export default function AddCustomerForm(props) {
    const initFormData = {
        firstName: '',
        lastName: '',
        number: '',
        discountId: '',
        code: '',
        ticketType: ''
    }

    const [discounts, setDiscounts] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [backendMsg, setBackendMsg] = useState(null);
    const [customerData, setCustomerData] = useState(initFormData);
    const [isSubmit, setIsSubmit] = useState(false);

    const fetchDiscount = async (signal) => {
        try {
            const request = await fetch('/discount', {
                signal: signal
            });
            const res = await request.json();

            setDiscounts(res.discounts);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    const fetchTicket = async (signal) => {
        try {
            const request = await fetch('/ticket', {
                signal: signal
            });
            const res = await request.json();

            setTickets(res.tickets);
        } catch (error) {
            if (!signal?.aborted) {
                console.log(error);
            }
        }
    }

    const submit = async (signal) => {

        try {
            const request = await fetch('/customer/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: signal,
                body: JSON.stringify(customerData)
            });
            const res = await request.json();

            if (res.msg.success) {
                setCustomerData(initFormData);
                setBackendMsg({
                    msg: res.msg.success,
                    status: true
                });

                if (props.tablePage.currentPage !== props.tablePage.totalPages - 1) {
                    props.customersArray.pop();
                    props.setCustomersArray([res.customer, ...props.customersArray]);
                } else {
                    props.setCustomersArray([res.customer, ...props.customersArray]);
                }
            }

            if (res.msg.error) {
                setBackendMsg({
                    msg: res.msg.error,
                    status: false
                });
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

        if (isSubmit) {
            submit(signal);
        }

        return () => {
            abortController.abort();
        }
    }, [isSubmit]);

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
        if (backendMsg) {
            const timeOut = setTimeout(() => { setBackendMsg(null) }, 5000);
            return () => {
                clearTimeout(timeOut);
            }
        }
    }, [backendMsg]);

    return (
        <>
            {backendMsg ? (
                <div className={backendMsg.status ? styles.form__success : styles.form__error}>{backendMsg.msg}</div>
            ) : null}

            <form onSubmit={(e) => { e.preventDefault(); setIsSubmit(true) }} className={styles.form}>
                <input value={customerData.firstName} onChange={e => setCustomerData({ ...customerData, firstName: e.target.value })} placeholder='Imie' className={styles.form__input} type='text' />
                <input value={customerData.lastName} onChange={e => setCustomerData({ ...customerData, lastName: e.target.value })} placeholder='Nazwisko' className={styles.form__input} type='text' />
                <input value={customerData.number} onChange={e => setCustomerData({ ...customerData, number: e.target.value })} placeholder='Numer' className={styles.form__input} type='text' />
                <input value={customerData.code} onChange={e => setCustomerData({ ...customerData, code: e.target.value })} placeholder='Code' className={styles.form__input} type='text' />
                <select value={customerData.ticketType} onChange={e => setCustomerData({ ...customerData, ticketType: e.target.value })} className={styles.form__select} name='ticket'>
                    <option>Karnet</option>
                    {tickets.map(ticket => <option key={ticket.id} value={ticket.id} disabled={!ticket.status}>{`${ticket.name} | ${ticket.activeDays} ${ticket.activeDays === 1 ? 'dzień' : 'dni'} | ${ticket.price}zł`}</option>)}
                </select>
                <select value={customerData.discountId} onChange={e => setCustomerData({ ...customerData, discountId: e.target.value })} className={styles.form__select} name='discount'>
                    <option>Znizka</option>
                    {discounts.map(discount => <option key={discount.id} value={discount.id} disabled={!discount.status}>{`${discount.name} | ${discount.discount}%`}</option>)}
                </select>
                <button className={styles.form__btn}>
                    Dodaj
                </button>
            </form>
        </>
    );
}