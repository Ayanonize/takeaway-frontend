import React, { useEffect, useState } from 'react'
import Admin from '../../Layouts/Admin'
import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';
export default function orders() {


    const [AllData, setAllData] = useState([]);
    const [PendingData, setPendingData] = useState([]);
    const [Delevered, setDelevered] = useState([]);
    const [Cancelled, setCancelled] = useState([]);
    const [Filter, setFilter] = useState('all');
    let Id;

    let router = useRouter();

    useEffect(() => {

        if (localStorage.Admintoken == null) {
            router.push('/admin/')
        }
        axios.get('http://localhost:5000/order/get').then((e) => {
            setAllData(e.data.data)
        })

        axios.get('http://localhost:5000/order/get', {
            params: {
                filter: 'pending'
            }
        }).then((e) => {
            setPendingData(e.data.data)
        })

        axios.get('http://localhost:5000/order/get', {
            params: {
                filter: 'delevered'
            }
        }).then((e) => {
            setDelevered(e.data.data)
        })

        axios.get('http://localhost:5000/order/get', {
            params: {
                filter: 'cancelled'
            }
        }).then((e) => {
            setCancelled(e.data.data)
        })

    }, [])


    function FilterAlgo(Data) {

        return Data.id != Id;
    }

    // function FilterCancellerdAlgo(Data) {
    //     return Data.id == Id;

    // }

    function handelCancel(id) {
        Id = id;
        let x = confirm('Are you sure you want to cancelled this request?');
        if (x) {
            let new_data = AllData.filter(FilterAlgo)
            // let new_cancelled_Data = AllData.filter(FilterCancellerdAlgo)
            setAllData(new_data);
            // setCancelled([...Cancelled, new_cancelled_Data]);
        }
    }


    return (
        <>

            <div class="container mx-auto mt-16 mb-5">
                <p class="font-semibold text-xl mb-5">List Of Orders</p>
                < div className='pt-5 space-x-3' >
                    <a className={`hover:cursor-pointer bg-none border-2 rounded-full ${Filter == "all" ? "border-black px-7 py-2 bg-black text-white " : "border-black px-7 py-2 text-black hover:bg-black hover:text-white"} duration-300 uppercase font-semibold`} onClick={() => { setFilter('all') }}>All</a>
                    <a className={`hover:cursor-pointer bg-none border-2 rounded-full ${Filter == "pending" ? "border-black px-7 py-2 bg-black text-white " : "border-black px-7 py-2 text-black hover:bg-black hover:text-white"} duration-300 uppercase font-semibold`} onClick={() => { setFilter('pending') }}>Pending</a>
                    <a className={`hover:cursor-pointer bg-none border-2 rounded-full ${Filter == "delevered" ? "border-black px-7 py-2 bg-black text-white " : "border-black px-7 py-2 text-black hover:bg-black hover:text-white"} duration-300 uppercase font-semibold`} onClick={() => { setFilter('delevered') }}>Delevered</a>
                    <a className={`hover:cursor-pointer bg-none border-2 rounded-full ${Filter == "cancelled" ? "border-black px-7 py-2 bg-black text-white " : "border-black px-7 py-2 text-black hover:bg-black hover:text-white"} duration-300 uppercase font-semibold`} onClick={() => { setFilter('cancelled') }}>Cancelled</a>
                </div>

            </div>
            {
                Filter == 'all' &&

                <div
                    class="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg"
                >
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                            <tr>
                                <th scope="col" class="px-6 py-3">ID</th>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">Email</th>
                                <th scope="col" class="px-6 py-3">Product Id</th>
                                <th scope="col" class="px-6 py-3">Address</th>
                                <th scope="col" class="px-6 py-3">State</th>
                                <th scope="col" class="px-6 py-3">City</th>
                                <th scope="col" class="px-6 py-3">Phone</th>
                                <th scope="col" class="px-6 py-3">Quantity</th>
                                <th scope="col" class="px-6 py-3">Discount</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>


                            {AllData != null ? AllData.map((e, Index) => {

                                return (

                                    <tr class="bg-white border-b">
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.email}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.product_id}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.address}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.state}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.city}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.phone}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.quantity}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.discount}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.price}</td>
                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.status}</td>
                                        <td class="px-6 py-4 flex">
                                            <a target={'_blank'} href={'/detail/' + e.product_id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>View</button></a>
                                            {e.status == 'pending' &&
                                                <>
                                                    <button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2' onClick={() => { handeldelete(e.code) }}>Delevered</button>
                                                    <button className='px-10 py-3 text-white rounded-md w-auto bg-red-500 mx-2' onClick={() => { handelCancel(e.id); }}>Cancel</button>
                                                </>}
                                        </td>
                                    </tr>

                                )
                            }) : ""}
                        </tbody>
                    </table>
                </div>
            }

            {
                Filter == "pending" && (

                    <div
                        class="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">ID</th>
                                    <th scope="col" class="px-6 py-3">Name</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">Product Id</th>
                                    <th scope="col" class="px-6 py-3">Address</th>
                                    <th scope="col" class="px-6 py-3">State</th>
                                    <th scope="col" class="px-6 py-3">City</th>
                                    <th scope="col" class="px-6 py-3">Phone</th>
                                    <th scope="col" class="px-6 py-3">Quantity</th>
                                    <th scope="col" class="px-6 py-3">Discount</th>
                                    <th scope="col" class="px-6 py-3">Price</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>


                                {PendingData != null ? PendingData.map((e, Index) => {

                                    console.log(Index)
                                    return (

                                        <tr class="bg-white border-b">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.email}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.product_id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.address}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.state}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.city}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.phone}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.quantity}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.discount}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.price}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.status}</td>
                                            <td class="px-6 py-4 flex">
                                                <a target={'_blank'} href={'/detail/' + e.product_id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>View</button></a>
                                                <button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2' onClick={() => { handeldelete(e.code) }}>Delevered</button>
                                                <button className='px-10 py-3 text-white rounded-md w-auto bg-red-500 mx-2' onClick={() => { handeldelete(e.code) }}>Cancel</button>
                                            </td>
                                        </tr>

                                    )
                                }) : ""}
                            </tbody>
                        </table>
                    </div>
                )
            }



            {
                Filter == "delevered" && (

                    <div
                        class="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">ID</th>
                                    <th scope="col" class="px-6 py-3">Name</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">Product Id</th>
                                    <th scope="col" class="px-6 py-3">Address</th>
                                    <th scope="col" class="px-6 py-3">State</th>
                                    <th scope="col" class="px-6 py-3">City</th>
                                    <th scope="col" class="px-6 py-3">Phone</th>
                                    <th scope="col" class="px-6 py-3">Quantity</th>
                                    <th scope="col" class="px-6 py-3">Discount</th>
                                    <th scope="col" class="px-6 py-3">Price</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>


                                {Delevered != null ? Delevered.map((e, Index) => {

                                    console.log(Index)
                                    return (

                                        <tr class="bg-white border-b">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.email}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.product_id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.address}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.state}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.city}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.phone}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.quantity}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.discount}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.price}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.status}</td>
                                            <td class="px-6 py-4 flex">
                                                <a target={'_blank'} href={'/detail/' + e.product_id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>View</button></a>

                                            </td>
                                        </tr>

                                    )
                                }) : ""}
                            </tbody>
                        </table>
                    </div>
                )
            }

            {
                Filter == "cancelled" && (

                    <div
                        class="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg"
                    >
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            >
                                <tr>
                                    <th scope="col" class="px-6 py-3">ID</th>
                                    <th scope="col" class="px-6 py-3">Name</th>
                                    <th scope="col" class="px-6 py-3">Email</th>
                                    <th scope="col" class="px-6 py-3">Product Id</th>
                                    <th scope="col" class="px-6 py-3">Address</th>
                                    <th scope="col" class="px-6 py-3">State</th>
                                    <th scope="col" class="px-6 py-3">City</th>
                                    <th scope="col" class="px-6 py-3">Phone</th>
                                    <th scope="col" class="px-6 py-3">Quantity</th>
                                    <th scope="col" class="px-6 py-3">Discount</th>
                                    <th scope="col" class="px-6 py-3">Price</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>


                                {Cancelled != null ? Cancelled.map((e, Index) => {

                                    console.log(Index)
                                    return (

                                        <tr class="bg-white border-b">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.name}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.email}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.product_id}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.address}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.state}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.city}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.phone}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.quantity}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.discount}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.price}</td>
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.status}</td>
                                            <td class="px-6 py-4 flex">
                                                <a target={'_blank'} href={'/detail/' + e.product_id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>View</button></a>

                                            </td>
                                        </tr>

                                    )
                                }) : ""}
                            </tbody>
                        </table>
                    </div>
                )
            }


        </>)
}
orders.getLayout = function getLayout(page) {
    return (
        <Admin>
            {page}
        </Admin>
    )
}