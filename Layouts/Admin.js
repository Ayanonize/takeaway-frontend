import React from 'react'
import AdminHeader from './components/AdminHeader'

export default function Admin({ children }) {
    return (
        <>
            <AdminHeader />
            <main className='container mx-auto'>

                {children}

            </main>
        </>

    )
}