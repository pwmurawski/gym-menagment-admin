import Customer from "./Customer/Customer";

export default function Customers(props) {
    return (
        <>
            {props.customersArray.map(customer => <Customer key={customer.id} customersArray={props.customersArray} setCustomersArray={props.setCustomersArray} {...customer} />)}
        </>
    );
}