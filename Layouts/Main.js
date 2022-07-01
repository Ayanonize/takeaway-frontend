import React from 'react'
import MainFooter from './components/MainFooter'
import MainHeader from './components/MainHeader'

export default function Main({ children }) {
    return (
        <div>
            <MainHeader />
            <main className='container mx-auto'>
                {children}
            </main>
            <MainFooter/>
        </div>
    )
}
