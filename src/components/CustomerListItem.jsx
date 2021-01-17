import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { CustomerListItemStyled } from './CustomerListItemStyled'

export default function CustomerListItem({customerData}) {
    const history = useHistory()

    return (
        <CustomerListItemStyled onClick={() => history.push(`/customer/${customerData.id}`)}>
            <td>
                <Link to={`/customer/${customerData.id}`} className="text-dark">
                    {customerData.name}
                </Link>
            </td>
        </CustomerListItemStyled>
    )
}
