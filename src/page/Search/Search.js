import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Search.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import ReducerContext from "../../context/Context";
import { fetchSearchCustomer } from "../../api/queryCustomers";

export default function Search() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [loading, setLoading] = useState(true);
  const [customersArray, setCustomersArray] = useState([]);
  const { term } = useParams();
  const stateGlobal = useContext(ReducerContext);

  const search = async () => {
    const res = await fetchSearchCustomer(term, signal);
    if (res) {
      setCustomersArray(res.customers);
      setLoading(false);
    }
  };

  useEffect(() => {
    search();

    return () => {
      abortController.abort();
    };
  }, [term]);

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div
      className={`${styles.pageContainer} ${
        styles[stateGlobal.state.theme] ?? ""
      }`}
    >
      <h2>Wyniki wyszukiwania:</h2>
      <CustomersTable size="67vh">
        <CustomersTableHead
          headers={["Imie", "Nazwisko", "Numer", "Karnet", "Znizka", "Data"]}
        />
        <CustomersTableBody>
          <Customers customersArray={customersArray} />
        </CustomersTableBody>
      </CustomersTable>
      {customersArray.length === 0 ? (
        <h3 className={styles.messageEmptySearch}>Brak wyników</h3>
      ) : null}
    </div>
  );
}
