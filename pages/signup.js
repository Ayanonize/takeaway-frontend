import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import NoHeaderFooter from '../Layouts/NoHeaderFooter'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');



    function AddUserData(e) {
        e.preventDefault();
        if (Fname.trim() != "" && Lname.trim() != "" && email.trim() != "" && password.trim() != "" && phone.trim() != "" && address.trim() != "") {
            axios.get('http://localhost:5000/user/create', {
                params: {
                    fname: Fname,
                    lname: Lname,
                    email: email,
                    password: password,
                    address: address,
                    phone: phone
                }
            }).then((e) => {
                if (e.data.success == true) {
                    toast.success('Your account have been registered successfuly no you can go to login page to continue', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                else {
                    toast.error('Email Alread Exist', {
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
            <div className='w-full h-[60vh]  overflow-auto p-10'>
                <p className='text-2xl font-bold my-3'>Get Started With Us</p>
                <form onSubmit={(e) => { AddUserData(e); }}>
                    <div className='grid grid-cols-2 gap-4'>
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='First Name' value={Fname} onChange={(e) => { setFname(e.target.value) }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Last Name' value={Lname} onChange={(e) => { setLname(e.target.value) }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Phone No.' value={phone} onChange={(e) => { setphone(e.target.value) }} />
                        <input type="text" className='p-3 font-lg border-2 rounded-md hover:border-black duration-500' placeholder='Address' value={address} onChange={(e) => { setaddress(e.target.value) }} />
                    </div>
                    <button className='bg-none border-[1px] p-2 px-5 border-black text-black hover:bg-black hover:text-white duration-500 mt-5 font-bold mx-auto'>SIGN UP</button>
                    <p className='text-center text-xl'>OR</p>
                    <div className='flex justify-center mt-3 text-blue-500'>
                        <Link href="/signin">Already Have An Account?</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

Signup.getLayout = function getLayout(page) {
    return (
        <NoHeaderFooter>
            {page}
        </NoHeaderFooter>
    )
}