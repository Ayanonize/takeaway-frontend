
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoHeaderFooter from '../../Layouts/NoHeaderFooter'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Index() {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const router = useRouter();


    useEffect(() => {
        if (localStorage.Admintoken != null) {
            router.push('/admin/item')
        }
    }, [])


    const handelsubmit = (e) => {
        e.preventDefault();
        if (email.trim() != "" && password.trim() != "") {

            axios.get('http://localhost:5000/user/getAdmin', {
                params: {
                    email,
                    password
                }
            }).then((e) => {

                if (e.data.success == true) {
                    localStorage.setItem('Admintoken', e.data.token);
                    toast.success('You are loggedIn successfuly', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => { router.push('/admin/item') }, 2000)
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
            toast.error('These Feilds Cannot Be Blank', {
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
        <>
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
            <div className='h-screen w-full flex justify-center items-center'>
                <div className=" w-[600px] p-5 rounded-md border-2 ">
                    <p className='text-3xl font-bold'>Admin Panel</p>
                    <form onSubmit={(e) => { handelsubmit(e) }}>
                        <div className='grid grid-cols-2 gap-4 mt-5'>
                            <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                            <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        </div>
                        <button className='bg-none border-[1px] w-full p-2 px-5 border-black text-black hover:bg-black hover:text-white duration-500 mt-5 font-bold mx-auto'>SIGN IN</button>
                    </form>
                </div>
            </div>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <NoHeaderFooter>
            {page}
        </NoHeaderFooter>
    )
}