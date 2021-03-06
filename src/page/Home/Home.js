import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import AddCustomerForm from "../../components/Customers/AddCustomer/AddCustomerForm";
import ReducerContext from "../../context/Context";
import { fetchCustomersPage } from "../../api/queryCustomers";
import { fetchDiscounts } from "../../api/queryDiscounts";
import { fetchTickets } from "../../api/queryTickets";
import HomeContext from "../../context/HomeContext";

export default function Home() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const stateGlobal = useContext(ReducerContext);
  const homeReducer = useContext(HomeContext);
  const dispatch = homeReducer?.dispatchH;
  const customersArray = homeReducer?.stateH?.customersArray;
  const [loading, setLoading] = useState(true);
  const [tablePage, setTablePage] = useState({
    currentPage: 0,
    totalPages: "",
  });

  const getCustomersPage = async () => {
    const res = await fetchCustomersPage(tablePage.currentPage, signal);

    if (res) {
      setTablePage({ ...tablePage, totalPages: res.totalPages });
      if (tablePage.currentPage === 0) {
        dispatch({ type: "setCustomersArray", customers: res.customers });
      } else {
        dispatch({ type: "addCustomersArray", customers: res.customers });
      }
      setLoading(false);
    }
  };

  const getDiscounts = async () => {
    const res = await fetchDiscounts(signal);

    if (res) dispatch({ type: "setDiscountsArray", discounts: res.discounts });
  };

  const getTickets = async () => {
    const res = await fetchTickets(signal);

    if (res) dispatch({ type: "setTicketsArray", tickets: res.tickets });
  };

  useEffect(() => {
    getCustomersPage();

    return () => {
      abortController.abort();
    };
  }, [tablePage.currentPage]);

  useEffect(() => {
    getDiscounts();
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
      <h2>Klienci:</h2>
      <AddCustomerForm tablePage={tablePage} />
      <CustomersTable
        pagination
        tablePage={tablePage}
        setTablePage={setTablePage}
      >
        <CustomersTableHead
          headers={["Imie i Nazwisko", "Numer", "Karnet", "Znizka", "Data"]}
        />
        <CustomersTableBody>
          <Customers customersArray={customersArray} />
        </CustomersTableBody>
      </CustomersTable>
      {customersArray.length === 0 ? (
        <h3 className={styles.messageEmptyCustomers}>Brak klient??w</h3>
      ) : null}
    </div>
  );
}
