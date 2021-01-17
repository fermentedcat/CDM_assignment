import React, {useState, useContext, useEffect} from 'react'
import { UserDataContext } from '../contexts/UserDataContext'

export default function DevCompareCustomersPage() {
    const [apiCustomers, setApiCustomers] = useState(null)
    const {customers} = useContext(UserDataContext)

    useEffect(() => {
        const allCustomersUrl = `https://frebi.willandskill.eu/api/v1/customers/`
        const token = localStorage.getItem("LOGIN")
        
        fetch(allCustomersUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("data results:", data.results)
            setApiCustomers(data.results)
        })
    }, [])
    return (
        <div>
            <h1>Backend List</h1>
            {customers && (
                customers.map((item) => {
                    return <p key={item.id}>{item.name}</p>
                })
            )}
            <h1>API List</h1>
            {apiCustomers && (
                apiCustomers.map((item) => {
                    return <p key={item.id}>{item.name}</p>
                })
            )}
        </div>
    )
}
