import React, { useEffect, useState } from 'react'

import Select from 'react-select';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from '../../../../Layouts/Admin';
import { useRouter } from 'next/router';

export default function item({ Data }) {

    let router = useRouter();
    let { slug } = router.query

    let options = [
        { label: "True", value: 'true' },
        { label: "False", value: 'false' }
    ]

    const [title, settitle] = useState('');
    const [img, setimg] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [Optionactive, setOptionactive] = useState('');


    useEffect(() => {

        settitle(Data.title);
        setimg(Data.img);
        setprice(Data.price);
        setdescription(Data.description);

    }, [])


    const handelsubmit = (e) => {
        e.preventDefault();
        if (title.trim() != "" && img.trim() != "" && price.trim() != "" && description.trim() != "" && Optionactive.trim() != "") {

            axios.get('http://localhost:5000/item/update', {
                params: {
                    id: slug,
                    title,
                    img,
                    price,
                    description,
                    active: Optionactive
                }
            }).then(() => {

                toast.success('Item Added Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }

        else {
            toast.error('These Feilds Cant Be Empty', {
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
            <div class="container p-10">

                <div>

                    <h1 class="text-4xl">Update Item</h1>
                    <div class="border-2 p-5 mt-4 rounded-md bg-white">
                        <form onSubmit={(e) => { handelsubmit(e) }}>

                            <div class="grid grid-cols-2 gap-4">
                                <input type="text" class="w-full border-2 p-2 rounded-md" placeholder="Title" value={title} onChange={(e) => {
                                    settitle(e.target.value)
                                }} />
                                <input type="text" class="w-full border-2 p-2 rounded-md" placeholder="Image Url" value={img} onChange={(e) => {
                                    setimg(e.target.value)
                                }} />
                                <input type="text" class="w-full border-2 p-2 rounded-md" placeholder="Price" value={price} onChange={(e) => {
                                    setprice(e.target.value)
                                }} />
                                <Select options={options} placeholder='Active' onChange={(e) => {
                                    setOptionactive(e.value)
                                }} />
                            </div>
                            <textarea cols="30" rows="5" placeholder='Description' class="w-full border-2 p-2 mt-4 rounded-md" value={description} onChange={(e) => {
                                setdescription(e.target.value)
                            }}></textarea>


                            <button class="px-10 py-3 rounded-md w-auto mt-4 bg-blue-500 text-white">Submit</button>
                        </form>
                    </div>

                </div>

                <h1 className='my-5 text-4xl text-center'>Preview</h1>
                <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                    <div class="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: "url(" + img + ")" }}>
                    </div>
                    <div class="px-5 py-3">
                        <h3 class="text-gray-700 uppercase">{title}</h3>
                        <h3 class="text-gray-700 font-sm break-words">{description && description.slice(0, 50)}...</h3>
                        <span class="text-gray-500 mt-2">₹{price}</span>
                        {Optionactive == 'false' &&
                            <p className='text-red-500 uppercase'>*Out Of Stock</p>
                        }
                    </div>
                </div>

            </div >
        </>
    )
}


item.getLayout = function getLayout(page) {
    return (
        <Admin>
            {page}
        </Admin>
    )
}

export async function getServerSideProps(context) {

    let x = await axios('http://localhost:5000/item/getOne/' + context.query.slug)
    return {
        props: { Data: x.data.data },
    }
}
