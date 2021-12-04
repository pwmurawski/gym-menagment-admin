import { useState } from 'react';

export default function Discount(props) {
    const [showEditCustomer, setShowEditCustomer] = useState(false);

    return (
        <tr onDoubleClick={() => { setShowEditCustomer(true) }}>
            {showEditCustomer ? (
                <>
                    <td>edit</td>
                    <td>edit</td>
                    <td>edit</td>
                </>
            ) : (
                <>
                    <td>{props.name}</td>
                    <td>{`${props.discount}%`}</td>
                    <td>{`${props.status}`}</td>
                </>
            )}
        </tr>
    );
}