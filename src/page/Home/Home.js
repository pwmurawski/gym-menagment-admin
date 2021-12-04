import styles from './Home.module.css';
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import { memo, useEffect, useState } from "react";
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import AddCustomerForm from "../../components/AddCustomer/AddCustomerForm";

function Home() {

    const [loading, setLoading] = useState(true);
    const [tablePage, setTablePage] = useState({
        currentPage: 0,
        totalPages: ''
    });
    const [customersArray, setCustomersArray] = useState([]);

    const fetchCustomersPage = async (signal) => {
        try {
            const request = await fetch(`/customer?page=${tablePage.currentPage}`, {
                signal: signal,
            });
            const res = await request.json();

            setTablePage({ ...tablePage, totalPages: res.totalPages });
            setCustomersArray([...customersArray, ...res.customers]);
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
        fetchCustomersPage(signal);
        return () => {
            abortController.abort();
        }
    }, [tablePage.currentPage]);

    return (
        <>
            {loading ? <LoadingIcon /> : (
                <div className={styles.pageContainer}>
                    <h2>Klienci:</h2>
                    <AddCustomerForm tablePage={tablePage} customersArray={customersArray} setCustomersArray={setCustomersArray} />
                    <CustomersTable pagination tablePage={tablePage} setTablePage={setTablePage}>
                        <CustomersTableHead headers={['Imie', 'Nazwisko', 'Numer', 'Karnet', 'Znizka', 'Data']} />
                        <CustomersTableBody>
                            <Customers customersArray={customersArray} setCustomersArray={setCustomersArray} />
                        </CustomersTableBody>
                    </CustomersTable>
                </div>
            )}
        </>
    );
}

export default memo(Home);