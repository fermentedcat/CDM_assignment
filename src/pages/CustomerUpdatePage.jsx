import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'

import { ButtonStyled } from '../components/Buttons/ButtonStyled'
import { ButtonWarningStyled } from '../components/Buttons/ButtonWarningStyled'


export default function CustomerUpdate(props) {
    const [formData, setFormData] = useState()
    const {customers, setCustomers} = useContext(UserDataContext)
    const customerId = props.match.params.id
    const history = useHistory()

    useEffect(() => {
        if (customers) {
            //* take customer data from stored object:
            setFormData(customers[customers.findIndex(item => item.id == customerId)])
        } else {
            //* save new customer data from api:
            const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
            const token = localStorage.getItem("TOKEN")

            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setFormData(data))  
        }
    }, [])

    function handleOnSubmit(e) {
        if (validateVat(formData.vatNr)) {
            e.preventDefault()
            const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
            const token = localStorage.getItem("TOKEN")

            fetch(url, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
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
                .then(() => history.push('/home'))
            }) 
        } else {
            alert("VAT nr must start with SE and end with 10 digits.")
            e.preventDefault()
        }
    }

    function validateVat(str) {
        let countryCode = (str[0] + str[1]).toUpperCase()
        let numbers = str.substring(2)
        let isNum = /^\d+$/.test(numbers)
        setFormData({...formData, vatNr: (countryCode + numbers)})
    
        return countryCode === "SE" && numbers.length === 10 && isNum
    }

    function renderInput(label, name, type) {
        return (
            <tr>
                <th>
                    <label>{label}</label>
                </th>
                <td className="pl-4">
                    <input 
                        type={type || "text"}
                        value={formData[name]}
                        name={name}
                        onChange={e => {
                            setFormData({...formData, [e.target.name]: e.target.value})
                        }}
                        required
                    />
                </td>
            </tr>
        )
    }
    return (
        <div className="row justify-content-center">
            {formData ?
                <form onSubmit={handleOnSubmit} className="col-6 rounded bg-light shadow p-4">
                    <h2 className="text-center">Edit customer info</h2>
                    <table className="mt-4 mb-4">
                        <tbody>
                            {renderInput("Name:", "name")}
                            {renderInput("Organization number:", "organisationNr", "number")}
                            {renderInput("VAT number:", "vatNr")}
                            {renderInput("Reference:", "reference")}
                            {renderInput("Payment term:", "paymentTerm", "number")}
                            {renderInput("Website:", "website", "url")}
                            {renderInput("Email:", "email", "email")}
                            {renderInput("Phone number:", "phoneNumber", "tel")}
                        </tbody>
                    </table>
                    <div className="d-flex flex-column">
                        <ButtonWarningStyled>Submit</ButtonWarningStyled>
                        <ButtonStyled onClick={() => history.push(`/customer/${customerId}/`)} className="mt-2">Back</ButtonStyled>
                    </div>
                </form>
            :
                <p>Loading form...</p>
            }
        </div>
    )
}
