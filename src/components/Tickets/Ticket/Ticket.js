import { useState } from 'react';

export default function Ticket(props) {
    const [showEditCustomer, setShowEditCustomer] = useState(false);

    return (
        <tr onDoubleClick={() => { setShowEditCustomer(true) }}>
            {showEditCustomer ? (
                <>
                    <td>edit</td>
                    <td>edit</td>
                    <td>edit</td>
                    <td>edit</td>
                </>
            ) : (
                <>
                    <td>{props.name}</td>
                    <td>{`${props.price} zł`}</td>
                    <td>{`${props.activeDays} ${props.activeDays === 1 ? 'dzień' : 'dni'}`}</td>
                    <td>{`${props.status}`}</td>
                </>
            )}
        </tr>
    );
}