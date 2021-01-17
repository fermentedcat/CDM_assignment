import React, { useEffect, useContext } from 'react'
import { UserDataContext } from '../contexts/UserDataContext'

import CustomerListItem from '../components/CustomerListItem'

export default function CustomerList() {
    const {customers, setCustomers} = useContext(UserDataContext)

    useEffect(() => {
        if (!customers) {
            const url = "https://frebi.willandskill.eu/api/v1/customers/"
            const token = localStorage.getItem("TOKEN")
    
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setCustomers(data.results)
            })
        }
        if (customers) {
        }

    }, [])

    return (
        <table className="table table-hover">
            <tbody>
                {customers ?
                customers.map(item => {
                    return <CustomerListItem key={item.id} customerData={item} />
                })
                :
                <p>Loading customers...</p>
                }
            </tbody>
        </table>
    )
}