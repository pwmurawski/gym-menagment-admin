import { useContext, useEffect, useState } from "react";
import styles from "./Discount.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import Discounts from "../../components/Discounts/Discounts";
import AddDiscountForm from "../../components/AddDiscountForm/AddDiscountForm";
import ReducerContext from "../../context/Context";
import FetchApi from "../../helpers/fetchApi";

export default function Discount() {
  const [discountsArray, setDiscountsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const stateGlobal = useContext(ReducerContext);

  const fetchDiscounts = async (signal) => {
    FetchApi(
      "/discount",
      {
        signal,
      },
      (res) => {
        setDiscountsArray(res.discounts);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetchDiscounts(signal);
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
            styles[stateGlobal.state.theme]
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
        </div>
      )}
    </div>
  );
}
