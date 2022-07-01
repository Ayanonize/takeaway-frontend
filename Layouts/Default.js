import React from 'react'
import DefaultFooter from './components/DefaultFooter'
import DefaultHeader from './components/DefaultHeader'

export default function Default({ children }) {
    return (
        <>
            <DefaultHeader />
            <main className='bg-gray-100'>

                {children}

            </main>
            <DefaultFooter />
        </>

    )
}