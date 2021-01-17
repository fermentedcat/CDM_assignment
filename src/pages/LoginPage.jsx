import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'

import { ButtonWarningStyled } from '../components/Buttons/ButtonWarningStyled'

export default function LoginPage() {
    const [userInput, setUserInput] = useState(getStoredData)
    const {setUserInfo, loggedIn, setLoggedIn} = useContext(UserDataContext)
    const history = useHistory()

    useEffect(() => {
        if (loggedIn) {
            history.push("/home")
        }
    }, [loggedIn])

    function getStoredData() {
        const data = JSON.parse(localStorage.getItem("LOGIN"))
        if (data) {
            return data
        } else {
            return { email: "", password: ""}
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: userInput.email,
            password: userInput.password
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            saveUserInfo(data.token)
            setLoggedIn(true)
            localStorage.setItem("TOKEN", data.token)
            localStorage.setItem("LOGIN", JSON.stringify(payload))
            history.push("/home")
        })
    }

    function saveUserInfo(token) {
        const url = "https://frebi.willandskill.eu/api/v1/me"
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setUserInfo(data))
    }
    
    function handleOnChange(e) {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    return (
        <div className="row">
            <form onSubmit={handleOnSubmit} class="m-50 mx-auto d-flex flex-column p-4 rounded bg-light shadow">
                <h1 className="text-center">Log in</h1>
                <table className="mt-4 mb-3">
                    <tbody>
                        <tr>
                            <th>
                                <label className="mb-0">Email: </label>
                            </th>
                            <td>
                                <input 
                                    className="form-control mb-1"
                                    name="email" 
                                    onChange={handleOnChange} 
                                    type="email" 
                                    value={userInput.email} 
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label className="mb-0">Password: </label>
                            </th>
                            <td>
                                <input 
                                    className="form-control mb-1"
                                    name="password" 
                                    onChange={handleOnChange} 
                                    type="password" 
                                    value={userInput.password} 
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ButtonWarningStyled type="submit">Log in</ButtonWarningStyled>
            </form>
        </div>
    )
}
