import { useContext } from "react";
import styles from "./Search.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import ReducerContext from "../../context/Context";
import useSearchCustomer from "../../hooks/useSearchCustomer";

export default function Search() {
  const stateGlobal = useContext(ReducerContext);
  const [customersArray, loading] = useSearchCustomer();

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
