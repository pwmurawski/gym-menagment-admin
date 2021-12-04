import { useState } from 'react';
import EditCustomer from '../../EditCustomer/EditCustomer';

export default function Customer(props) {

    const [showEditCustomer, setShowEditCustomer] = useState(false);

    return (
        <tr onDoubleClick={() => { setShowEditCustomer(true) }} style={showEditCustomer ? { backgroundColor: 'rgb(219, 238, 255)' } : null}>
            {showEditCustomer ? (
                <>
                    <EditCustomer setShowEditCustomer={setShowEditCustomer} {...props} />
                </>
            ) : (
                <>
                    <td>{props.firstName}</td>
                    <td>{props.lastName}</td>
                    <td>{props.number}</td>
                    <td>{`${props.ticket.name} | Cena:${props.ticket.finalPrice} zł`}</td>
                    <td>{`${props.discount.name} | ${props.discount.discount}%`}</td>
                    <td>{props.ticket.dateTo}</td>
                </>
            )}
        </tr>
    );
}