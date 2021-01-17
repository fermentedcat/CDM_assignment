import React, { useContext } from 'react'
import CustomerList from '../components/CustomerList'
import { UserDataContext } from '../contexts/UserDataContext'

export default function HomePage() {
    const { userInfo } = useContext(UserDataContext)

    return (
        <>
            {userInfo ? (
                <div className="row justify-content-around">
                    <div className="col-5 rounded bg-light shadow p-4">
                        <h2 className="mb-3">Profile</h2>
                        <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
                        <p>Email: {userInfo.email}</p>
                    </div>
                    <div className="col-6 rounded bg-light shadow p-4">
                        <h2 className="mb-3">Customers</h2>
                        <CustomerList />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </>
    )
}
