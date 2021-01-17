import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { UserDataContext } from './contexts/UserDataContext'

import Header from './components/Header';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomerCreatePage from './pages/CustomerCreatePage';
import CustomerUpdatePage from './pages/CustomerUpdatePage';


function App() {
  const [userInfo, setUserInfo] = useState({})
  const [customers, setCustomers] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const userDataContextValue = { 
    userInfo, setUserInfo, 
    customers, setCustomers, 
    loggedIn, setLoggedIn
  }

  useEffect(() => {
    checkValidToken()
    console.log("validating token");
  }, [])

 
  function checkValidToken() {
    const token = localStorage.getItem("TOKEN")
    const url = "https://frebi.willandskill.eu/api-token-verify/"
    const payload = { token: token }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setLoggedIn(data.token === token))
  }

  
  return (
    <div className="w-100 bg-light" style={{height: 100 + "vh"}}>

      <div className="container bg-white h-100">

        

        <UserDataContext.Provider value={userDataContextValue}>
          <Header />
          <Switch>

            <Route path="/log-in">
              <LoginPage />
            </Route>

            <Route path="/home" component={HomePage}/>
            <Route path="/customer/add" component={CustomerCreatePage} />
            <Route path="/customer/:id/edit" component={CustomerUpdatePage} />
            <Route path="/customer/:id" component={CustomerDetailPage} />

          </Switch>
        </UserDataContext.Provider>
      </div>
    </div>
  );
}

export default App;
