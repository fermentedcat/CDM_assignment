import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'

import { ButtonWarningStyled } from '../components/Buttons/ButtonWarningStyled'


export default function CustomerCreate() {
    const [formData, setFormData] = useState({})
    const { customers, setCustomers } = useContext(UserDataContext)
    const history = useHistory()
    
    function handleOnSubmit(e) {
        e.preventDefault()
        if (customers.length > 10) {
            alert("Sorry, you already have enough customers. You can't handle another one. You'll need to delete one first.")
        } else if (validateVat(formData.vatNr)) {
            const url = "https://frebi.willandskill.eu/api/v1/customers/"
            const token = localStorage.getItem("TOKEN")
    
            fetch(url, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            ////save new customer data from api
            .then(data => setCustomers([...customers, data]))
            .then(() => history.push('/home'))
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
                <td>
                    <input 
                        className="form-control mb-1"
                        type={type || "text"}
                        name={name}
                        value={formData[name] || ""}
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
            <form onSubmit={handleOnSubmit} className="col-6 rounded bg-light shadow p-4">
                <h2 className="text-center">Add a new customer</h2>
                <table className="mt-4 mb-4 w-100">
                    <tbody>
                        {renderInput("Name:", "name", )}
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
                    <ButtonWarningStyled type="submit">Submit</ButtonWarningStyled>
                </div>
            </form>
        </div>
    )
}
