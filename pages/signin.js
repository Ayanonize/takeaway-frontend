import Link from 'next/link'
import React, { useState } from 'react'
import NoHeaderFooter from '../Layouts/NoHeaderFooter'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function Signin() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const router = useRouter();

    function AddUserData(e) {
        e.preventDefault();
        if (email.trim() != "" && password.trim() != "") {
            axios.get('http://localhost:5000/user/get', {
                params: {
                    email: email,
                    password: password,
                }
            }).then((e) => {
                console.log(e.data)
                if (e.data.success == true) {
                    localStorage.setItem('token', e.data.token);
                    toast.success('You are loggedIn successfuly', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => { router.push('/mainpage') }, 2000)
                }

                else {
                    toast.error('Email Or Password May Be Incorrect', {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            })
        }
        else {
            toast.error('These Feilds Cant Be Empty!', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='w-full h-[40vh]' style={{ backgroundImage: "url(https://images.pexels.com/photos/442599/pexels-photo-442599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
                <Link href={'/'}><button className='bg-none border-[1px] p-2 px-5 border-white text-white hover:bg-white hover:text-black duration-500 m-5 font-bold'>BAKC HOME</button></Link>

            </div>
            <div className='w-full h-[60vh] p-10 overflow-auto'>
                <p className='text-2xl font-bold my-3'>Welcome Back</p>
                <form onSubmit={(e) => { AddUserData(e); }}>
                    <div className='grid grid-cols-2 gap-4'>
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Email' value={email} onChange={(e) => {
                            setemail(e.target.value)
                        }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Password' value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} />
                    </div>
                    <button className='bg-none border-[1px] p-2 px-5 border-black text-black hover:bg-black hover:text-white duration-500 mt-5 font-bold mx-auto'>SIGN IN</button>
                    <p className='text-center text-xl'>OR</p>
                    <div className='flex justify-center mt-3 text-blue-500'>
                        <Link href="/signup">Don't Have An Account?</Link>
                    </div>

                </form>
            </div>
        </div >
    )
}

Signin.getLayout = function getLayout(page) {
    return (
        <NoHeaderFooter>
            {page}
        </NoHeaderFooter>
    )
}