import React, { useEffect, useState } from 'react'
import SingelItem from './SingelItem'
import axios from 'axios'

export default function AllItem({ search }) {

    const [Data, setData] = useState([]);
    const [BackUp, setBackUp] = useState([]);
    const [ShowSearch, setShowSearch] = useState(false);


    function GetData() {
        axios.get('http://localhost:5000/item/get', {
            params: {
                instock: 'true'
            }
        }).then(e => {
            setData(e.data.data)
        })
    }

    useEffect(() => {

        GetData();

    }, [])

    useEffect(() => {

        // Filtering Function
        function filterOut(DataInput) {
            let desc = DataInput.description.toLowerCase()
            let title = DataInput.title.toLowerCase()
            let lowerSearch = search.toLowerCase();

            console.log(lowerSearch)
            if (desc.search(lowerSearch) != -1 || title.search(lowerSearch) != -1) {
                return (DataInput)
            }
        }

        //To Update state data
        if (search.trim() != "") {
            setShowSearch(true)
            let NewData = Data.filter(filterOut)
            setBackUp(NewData)
        }

        else {
            setShowSearch(false)
            GetData()
        }


    }, [search])


    return (
        <>
            <div class=" py-8">
                <div class="container mx-auto px-6">
                    <div class="mt-16">
                        <h3 class="text-gray-600 text-4xl font-medium nav">Browse Some Of Our Dishes</h3>
                        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">

                            {Data != null ? ShowSearch == false ? Data.map(e => {
                                return (
                                    <SingelItem data={e} />

                                )

                            }) : BackUp.map(e => {
                                return (
                                    <SingelItem data={e} />

                                )

                            }) : ""}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
