import { memo, useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import CustomersTable from "../../components/CustomersTable/CustomersTable";
import CustomersTableHead from "../../components/CustomersTable/CustomersTableHead/CustomersTableHead";
import CustomersTableBody from "../../components/CustomersTable/CustomersTableBody/CustomersTableBody";
import Customers from "../../components/Customers/Customers";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import AddCustomerForm from "../../components/AddCustomer/AddCustomerForm";
import FetchApi from "../../helpers/fetchApi";
import ReducerContext from "../../context/Context";

function Home() {
  const [loading, setLoading] = useState(true);
  const [tablePage, setTablePage] = useState({
    currentPage: 0,
    totalPages: "",
  });
  const [customersArray, setCustomersArray] = useState([]);
  const [discountArray, setDiscountArray] = useState([]);
  const [ticketArray, setTicketArray] = useState([]);
  const stateGlobal = useContext(ReducerContext);

  const fetchCustomersPage = async (signal) => {
    FetchApi(`/customer?page=${tablePage.currentPage}`, { signal }, (res) => {
      setTablePage({ ...tablePage, totalPages: res.totalPages });
      setCustomersArray([...customersArray, ...res.customers]);
      setLoading(false);
    });
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

    fetchCustomersPage(signal);

    return () => {
      abortController.abort();
    };
  }, [tablePage.currentPage]);

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
            styles[stateGlobal.state.theme] ?? ""
          }`}
        >
          <h2>Klienci:</h2>
          <AddCustomerForm
            tablePage={tablePage}
            customersArray={customersArray}
            setCustomersArray={setCustomersArray}
            discountArray={discountArray}
            ticketArray={ticketArray}
          />
          <CustomersTable
            pagination
            tablePage={tablePage}
            setTablePage={setTablePage}
          >
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

export default memo(Home);
