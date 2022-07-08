import React, { useEffect, useState } from 'react'
import Main from '../../Layouts/Main'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function slug(props) {

    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [quantity, setquantity] = useState(1);
    const [coupoun, setcoupoun] = useState('');
    const [state, setstate] = useState('');
    const [city, setcity] = useState('');
    const [codedisable, setcodedisable] = useState(false)
    const [discount, setdiscount] = useState(0)
    const [orderplaced, setorderplaced] = useState(false)


    useEffect(() => {

        let token = jwt.verify(localStorage.token, 'Token')
        setemail(token.email)
        setaddress(token.address)
        setname(token.name)
        setphone(token.phone)
    }, [])


    function handelOrder() {
        axios.get('http://localhost:5000/order/create', {
            params: {
                name,
                email,
                phone,
                address,
                quantity,
                state,
                city,
                discount,
                product_id: props.slug,
                price: parseInt((props.data[0].price * quantity) - parseFloat(0 + "." + discount) * (props.data[0].price * quantity))
            }
        }).then(e => {
            toast.success('Order Added Successfuly!', {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setcodedisable('')
            setorderplaced(true)

        })
    }





    function addcode() {
        axios.get('http://localhost:5000/coupon/getOne/' + coupoun).then((e) => {
            if (e.data.success == true) {
                toast.success('Code Added Successfuly!', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setcodedisable(true)
                setdiscount(e.data.data.discount)
            }

            else {
                toast.error('No Code Found', {
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
            <div className="p-10">
                <p className='text-4xl text-center font-bold'>Checkout</p>
                <div className='my-5'>
                    <p className='text-2xl font-medium'>1. Delivery Details</p>
                    <form action="">
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className='w-full'>
                                <label htmlFor="">Name</label>
                                <input type="text" className='w-full border-2 p-3 rounded-md' value={name} onChange={(e) => { setname(e.target.value) }} />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="">Email</label>
                                <input type="text" className='w-full border-2 p-3 rounded-md' value={email} />
                            </div>

                        </div>
                        <div className='mt-3'>
                            <label htmlFor="">Address</label>
                            <textarea name="" id="" cols="30" rows="2" className='w-full border-2 p-3 rounded-md' value={address} onChange={(e) => { setaddress(e.target.value) }}></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3">

                            <div className='w-full'>
                                <label htmlFor="">State</label>
                                <input type="text" className='w-full border-2 p-3 rounded-md' value={state} onChange={(e) => { setstate(e.target.value) }} />
                            </div>


                            <div className='w-full'>
                                <label htmlFor="">City</label>
                                <input type="text" className='w-full border-2 p-3 rounded-md' value={city} onChange={(e) => { setcity(e.target.value) }} />
                            </div>

                        </div>

                        <div className='w-full mt-3'>
                            <label htmlFor="">Phone No.</label>
                            <input type="text" className='w-full border-2 p-3 rounded-md' placeholder='Your 10 Digit Phone No.' value={phone} />
                        </div>

                    </form>
                </div>

                <div className='my-5'>
                    <p className='text-2xl font-medium'>2. Review Cart Items</p>
                    <div className="bg-gray-200 p-7 my-3 rounded-md">
                        <div class="flex flex-col">
                            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full">
                                            <thead class="bg-white border-b">
                                                <tr>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        #
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Item
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Price
                                                    </th>
                                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Quantity
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {props.data.map((e) => {
                                                    return (
                                                        <tr class="bg-white border-b">
                                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                <img src={e.img} className='w-8 h-8 object-fit object-center rounded-full' alt="" />
                                                            </td>
                                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {e.title}
                                                            </td>
                                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {e.price}₹
                                                            </td>
                                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex space-x-2">
                                                                <button onClick={() => {
                                                                    let prev = quantity
                                                                    setquantity(prev + 1)
                                                                }} ><svg className='w-5 h-5 border-2 border-black rounded-full cursor-pointer ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg></button>
                                                                <p className='font-bold'>{quantity}</p>
                                                                <button onClick={() => {
                                                                    if (quantity > 0) {
                                                                        let prev = quantity
                                                                        setquantity(prev - 1)
                                                                    }
                                                                }} ><svg className='w-5 h-5 border-2 border-black rounded-full cursor-pointer ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" /></svg></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="mt-3 space-x-3 flex items-center">
                                <p className='text-xl mt-3 font-bold'>SubTotal:
                                    {discount > 0 ? parseInt((props.data[0].price * quantity) - parseFloat(0 + "." + discount) * (props.data[0].price * quantity)) : (props.data[0].price * quantity)}
                                    ₹ </p>
                                <button disabled={name.trim() == "" || email.trim() == "" || phone.trim() == "" || address.trim() == "" || state.trim() == "" || city.trim() == "" || quantity == 0 || orderplaced ? true : false} className='bg-blue-500 disabled:bg-blue-300  text-white px-6 py-2 rounded-md' onClick={() => { handelOrder() }}>Confirm</button>

                            </div>
                            {discount != 0 && <><br /> <p className='text-green-500'>{discount}% Discount Included</p></>}
                            <div className="mt-3 space-x-3 flex items-center justify-end">
                                <input disabled={codedisable} type="text" className='border-2 disabled:opacity-70 disabled:bg-gray-100  p-2 rounded-md uppercase' placeholder='COUPON CODE' value={coupoun} onChange={(e) => { setcoupoun(e.target.value) }} />
                                {codedisable == false ? <button className='bg-blue-500 disabled:bg-blue-300  text-white px-6 py-2 rounded-md' disabled={quantity == 0 || coupoun.trim() == "" || codedisable} onClick={addcode}>Add</button> :
                                    <button className='bg-blue-500  text-white px-6 py-2 rounded-md' onClick={() => { setdiscount(0); setcoupoun(''); setcodedisable(false) }}>Clear</button>
                                }
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

slug.getLayout = function getLayout(page) {
    return (
        <Main>
            {page}
        </Main>
    )
}




export async function getServerSideProps(context) {
    let slug = context.query.slug
    console.log(slug)

    let data = await axios('http://localhost:5000/item/getOne/' + slug)


    return {
        props: { data: [data.data.data], slug: slug }, // will be passed to the page component as props
    }
}
