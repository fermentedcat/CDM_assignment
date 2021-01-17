import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'

import { ButtonStyled } from '../components/Buttons/ButtonStyled'
import { ButtonWarningStyled } from '../components/Buttons/ButtonWarningStyled'



export default function CustomerDetailPage(props) {
    const [customerData, setCustomerData] = useState()
    const {customers, setCustomers} = useContext(UserDataContext)
    const customerId = props.match.params.id
    const history = useHistory()

    useEffect(() => {
        if (customers) {
            // get customer info from customers
            setCustomerData(customers[customers.findIndex(item => item.id == customerId)])
        } else {
            // save new customer data from api
            const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
            const token = localStorage.getItem("TOKEN")

            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setCustomerData(data))  
        }
    }, [])

    function renderData(title, key, href) {
        return (
            <tr>
                <th>{title}</th>
                <td className="pl-4" mailto={customerData[key]}>
                    {href 
                    ? <a href={href} target="_blank">{customerData[key]}</a>
                    : customerData[key]
                    }  
                </td>
            </tr>
        )
    }

    function deleteCustomer() {
        if (window.confirm("Are you sure?")) {
            const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
            const token = localStorage.getItem("TOKEN")
            
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(() => {
                const allCustomersUrl = `https://frebi.willandskill.eu/api/v1/customers/`
                fetch(allCustomersUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => setCustomers(data.results))

            })
            .then(() => history.push("/home"))
        }
    }

    return (
        <div className="row justify-content-center">
            {customerData ?
                <div className="col-6 rounded bg-light shadow p-4">
                    <h2 className="text-center">Customer details</h2>
                    <table className="mt-4 mb-3">
                        <tbody>
                            {renderData("Name:", "name")}
                            {renderData("Organization number:", "organisationNr")}
                            {renderData("VAT number:", "vatNr")}
                            {renderData("Reference:", "reference")}
                            {renderData("Payment term:", "paymentTerm")}
                            {renderData("Website:", "website", customerData.website)}
                            {renderData("Email:", "email", `mailto:${customerData.email}`)}
                            {renderData("Phone number:", "phoneNumber")}
                        </tbody>
                    </table>
                    <div className="mt-4  d-flex flex-column">
                        <ButtonWarningStyled onClick={() => history.push(`/customer/${customerId}/edit`)}>Edit info</ButtonWarningStyled>
                        <ButtonWarningStyled danger onClick={deleteCustomer} className="mt-2">Delete customer</ButtonWarningStyled>
                        <ButtonStyled onClick={() => history.push("/home")}className="mt-2">Back</ButtonStyled>
                    </div>
                </div>
            :
                <p>Loading data...</p>
            }
        </div>
    )
}
