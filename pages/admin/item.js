import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Admin from '../../Layouts/Admin'
import { useRouter } from 'next/router';

export default function item() {


    const [Data, setData] = useState([]);
    let router = useRouter();
    let DeleteId;

    function Remove(Data) {
        return Data.id != DeleteId

    }

    function handeldelete(id) {
        axios.get('http://localhost:5000/item/delete', {
            params: {
                id: id
            }
        }).then(() => {
            DeleteId = id;
            let raw_data = Data.filter(Remove)
            setData(raw_data)
        })
    }

    useEffect(() => {

        if (localStorage.Admintoken == null) {
            router.push('/admin/')
        }
        axios.get('http://localhost:5000/item/get', {
            params: {
                instock: 'false'
            }
        }).then((e) => {
            setData(e.data.data)
        })

    }, [])


    return (
        <>

            <div class="container mx-auto mt-16 mb-5">
                <p class="font-semibold text-xl mb-5">List Of Items</p>
                <Link href={'/admin/add/item'}><button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Item
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
                            <th scope="col" class="px-6 py-3">Title</th>
                            <th scope="col" class="px-6 py-3">Description</th>
                            <th scope="col" class="px-6 py-3">Image</th>
                            <th scope="col" class="px-6 py-3">Price</th>
                            <th scope="col" class="px-6 py-3">Active</th>
                            <th scope="col" class="px-6 py-3">Created At</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {Data != null ? Data.map((e) => {

                            return (

                                <tr class="bg-white border-b">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.id}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.title}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.description}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.img}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.price}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.active}</td>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{e.created_at}</td>
                                    <td class="px-6 py-4 flex"><Link href={'/admin/update/item/' + e.id}><button className='px-10 py-3 text-white rounded-md w-auto bg-blue-500 mx-2'>Update</button></Link><button className='px-10 py-3 text-white rounded-md w-auto bg-red-500 mx-2' onClick={() => { handeldelete(e.id) }}>Delete</button></td>
                                </tr>

                            )
                        }) : ""}
                    </tbody>
                </table>
            </div>
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