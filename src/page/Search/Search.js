import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Search.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import FetchApi from "../../helpers/fetchApi";
import ReducerContext from "../../context/Context";

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [customersArray, setCustomersArray] = useState([]);
  const [discountArray, setDiscountArray] = useState([]);
  const [ticketArray, setTicketArray] = useState([]);
  const { term } = useParams();
  const stateGlobal = useContext(ReducerContext);

  const search = async (signal) => {
    FetchApi(
      `/customer/search?q=${term}`,
      {
        signal,
      },
      (res) => {
        setCustomersArray(res.customers);
        setLoading(false);
      }
    );
  };

  const fetchDiscount = async (signal) => {
    FetchApi(
      "/discount",
      {
        signal,
      },
      (res) => {
        setDiscountArray(res.discounts);
      }
    );
  };

  const fetchTicket = async (signal) => {
    FetchApi(
      "/ticket",
      {
        signal,
      },
      (res) => {
        setTicketArray(res.tickets);
      }
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    search(signal);

    return () => {
      abortController.abort();
    };
  }, [term]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchDiscount(signal);
    fetchTicket(signal);

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
          <h2>Wyniki wyszukiwania:</h2>
          <CustomersTable size="67vh">
            <CustomersTableHead
              headers={[
                "Imie",
                "Nazwisko",
                "Numer",
                "Karnet",
                "Znizka",
                "Data",
              ]}
            />
            <CustomersTableBody>
              <Customers
                customersArray={customersArray}
                setCustomersArray={setCustomersArray}
                discountArray={discountArray}
                ticketArray={ticketArray}
              />
            </CustomersTableBody>
          </CustomersTable>
        </div>
      )}
    </div>
  );
}
