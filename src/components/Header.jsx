import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserDataContext } from '../contexts/UserDataContext'

import { ButtonNavStyled } from './Buttons/ButtonNavStyled'
import { HeaderStyled } from './HeaderStyled'


export default function Header() {
    const {
        userInfo, setUserInfo, 
        setCustomers, 
        loggedIn, setLoggedIn
    } = useContext(UserDataContext)

    const history = useHistory()

    function handleLogOut() {
        setUserInfo({})
        setCustomers(null)
        setLoggedIn(false)
        localStorage.removeItem("TOKEN")
        history.push("/log-in")
    }

    useEffect(() => {
        if (loggedIn && (Object.keys(userInfo).length < 1)) {
            const url = "https://frebi.willandskill.eu/api/v1/me"
            const token = localStorage.getItem("TOKEN")
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setUserInfo(data))
        }
    }, [loggedIn])

    return (
        <div className="row">
            <HeaderStyled>
                <h1 className="text-center m-5">BIG BIZNEZ</h1>
                {loggedIn && (
                    <div>
                        <div>
                            <Link to="/home">
                                <ButtonNavStyled nav>Home</ButtonNavStyled>
                            </Link>
                            <Link to="/customer/add">
                                <ButtonNavStyled nav>Add Customer</ButtonNavStyled>
                            </Link>
                        </div>
                        <div>
                            <div>
                                {userInfo.firstName && <p className="text-light">Logged in as: {userInfo.firstName}</p>}
                            </div>
                            <ButtonNavStyled 
                                onClick={handleLogOut} 
                                background="gold">
                                    Log out
                            </ButtonNavStyled>
                        </div>
                    </div> 
                )}
            </HeaderStyled>
        </div>
    )
}
