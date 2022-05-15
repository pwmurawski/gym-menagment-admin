import { useContext, useEffect, useState } from "react";
import styles from "./Discount.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import Discounts from "../../components/Discounts/Discounts";
import AddDiscountForm from "../../components/Discounts/AddDiscountForm/AddDiscountForm";
import ReducerContext from "../../context/Context";
import { fetchDiscounts } from "../../api/queryDiscounts";

export default function Discount() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [discountsArray, setDiscountsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const stateGlobal = useContext(ReducerContext);

  const getDiscounts = async () => {
    const res = await fetchDiscounts(signal);

    if (res?.discounts) {
      setDiscountsArray(res.discounts);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiscounts();

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
