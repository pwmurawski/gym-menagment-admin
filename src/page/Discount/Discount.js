import { useContext } from "react";
import styles from "./Discount.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import Discounts from "../../components/Discounts/Discounts";
import AddDiscountForm from "../../components/Discounts/AddDiscountForm/AddDiscountForm";
import ReducerContext from "../../context/Context";
import useDiscounts from "../../hooks/useDiscounts";

export default function Discount() {
  const stateGlobal = useContext(ReducerContext);
  const [discountsArray, setDiscountsArray, loading] = useDiscounts();

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div
      className={`${styles.pageContainer} ${
        styles[stateGlobal.state.theme] ?? ""
      }`}
    >
      <h2>Znizki:</h2>
      <AddDiscountForm
        discountsArray={discountsArray}
        setDiscountsArray={setDiscountsArray}
      />

      <CustomersTable>
        <CustomersTableHead headers={["Nazwa", "Zniżka", "Status"]} />
        <CustomersTableBody>
          <Discounts discountsArray={discountsArray} />
        </CustomersTableBody>
      </CustomersTable>
      {discountsArray.length === 0 ? (
        <h3 className={styles.messageEmptyCustomers}>Brak zniżek</h3>
      ) : null}
    </div>
  );
}
