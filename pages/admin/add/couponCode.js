import React, { useState } from 'react'
import Admin from '../../../Layouts/Admin'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function couponCode() {

    let options = [
        { label: "True", value: 'true' },
        { label: "False", value: 'false' }
    ]

    const [code, setcode] = useState('')
    const [use_limit, setuse_limit] = useState("")
    const [discount, setdiscount] = useState("")
    const [Optionactive, setOptionactive] = useState('');

    function handelsubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:5000/coupon/create', {
            params: {
                code: code,
                use_limit: use_limit,
                discount: discount,
                active: Optionactive
            }
        }).then((e) => {
            if (e.data.success == true) {
                setdiscount('');
                setcode('');
                setuse_limit('');

                toast.success('Coupon Code Added Successfully', {
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
                toast.error('Code Already Exist', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
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
            <div class="container p-10">

                <div>

                    <h1 class="text-4xl">Add Coupon Code</h1>
                    <div class="border-2 p-5 mt-4 rounded-md bg-white">
                        <form onSubmit={(e) => { handelsubmit(e) }}>

                            <div class="grid grid-cols-2 gap-4">
                                <input type="text" class="w-full uppercase border-2 p-2 rounded-md" placeholder="CODE" value={code} onChange={(e) => {
                                    setcode(e.target.value)
                                }} />
                                <input type="text" class="w-full border-2 p-2 rounded-md" placeholder="Use Limit" value={use_limit} onChange={(e) => {
                                    setuse_limit(e.target.value)
                                }} />
                                <input type="text" class="w-full border-2 p-2 rounded-md" placeholder="Discount" value={discount} onChange={(e) => {
                                    setdiscount(e.target.value)
                                }} />
                                <Select options={options} placeholder='Active' onChange={(e) => {
                                    setOptionactive(e.value)
                                }} />
                            </div>



                            <button disabled={code.trim() == "" || use_limit == "" || discount == "" || Optionactive == ""} class="px-10 py-3 rounded-md w-auto mt-4 bg-blue-500 disabled:bg-blue-300 text-white">Submit</button>
                        </form>
                    </div>

                </div>


            </div >
        </>
    )
}

couponCode.getLayout = function getLayout(page) {
    return (
        <Admin>
            {page}
        </Admin>
    )
}