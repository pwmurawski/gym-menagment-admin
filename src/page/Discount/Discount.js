import { useContext, useEffect, useState } from "react";
import styles from "./Discount.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import Discounts from "../../components/Discounts/Discounts";
import AddDiscountForm from "../../components/Discounts/AddDiscountForm/AddDiscountForm";
import ReducerContext from "../../context/Context";
import FetchApi from "../../helpers/fetchApi";

export default function Discount() {
  const abortController = new AbortController();
  const { signal } = abortController;
  const [discountsArray, setDiscountsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const stateGlobal = useContext(ReducerContext);

  const fetchDiscounts = async () => {
    FetchApi(
      "/discount",
      {
        signal,
      },
      (res) => {
        setDiscountsArray(res.discounts);
        if (res.discounts) {
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    fetchDiscounts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
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
              <Discounts
                discountsArray={discountsArray}
                setDiscountsArray={setDiscountsArray}
              />
            </CustomersTableBody>
          </CustomersTable>
          {discountsArray.length === 0 ? (
            <h3 className={styles.messageEmptyCustomers}>Brak zniżek</h3>
          ) : null}
        </div>
      )}
    </div>
  );
}
