import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Admin from '../../Layouts/Admin'
import { useRouter } from 'next/router';

export default function couponCode() {


    const [Data, setData] = useState([]);
    let router = useRouter();
    let Deletecode;

    function Remove(Data) {
        return Data.code != Deletecode

    }

    function handeldelete(code) {
        axios.get('http://localhost:5000/coupon/delete/' + code).then(() => {
            Deletecode = code;
            let raw_data = Data.filter(Remove)
            setData(raw_data)
        })
    }

    useEffect(() => {

        if (localStorage.Admintoken == null) {
            router.push('/admin/')
        }
        axios.get('http://localhost:5000/coupon/get').then((e) => {
            setData(e.data.data)
        })

    }, [])


    return (
        <>

            <div class="container mx-auto mt-16 mb-5">
                <p class="font-semibold text-xl mb-5">List Of Coupon Codes</p>
                <Link href={'/admin/add/couponCode'}><button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Coupon Code
                </button></Link>
            </div>
            <div
                class="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg"
            >
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        <tr>
                            <th scope="col" class="px-6 py-3">ID</th>
                            <th scope="col" class="px-6 py-3">Code</th>
                            <th scope="col" class="px-6 py-3">Use Limit</th>
                            <th scope="col" class="px-6 py-3">Used</th>
                            <th scope="col" class="px-6 py-3">Discount</th>
                            <th scope="col" class="px-6 py-3">Active</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {Data != null ? Data.map((e) => {

                            return (

                                <tr class="bg-white border-b">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.code}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.use_limit}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.used}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.discount}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.active}</td>
                                    <td class="px-6 py-4 flex"><Link href={'/admin/update/item/' + e.id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>Update</button></Link><button className='px-10 py-3 text-white rounded-md w-auto bg-red-500 mx-2' onClick={() => { handeldelete(e.code) }}>Delete</button></td>
                                </tr>

                            )
                        }) : ""}
                    </tbody>
                </table>
            </div>
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