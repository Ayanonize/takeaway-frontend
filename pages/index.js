import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Default from '../Layouts/Default'


export default function Home() {
  const [token, settoken] = useState('');

  useEffect(() => {
    settoken(localStorage.token)
  }, [])


  return (
    <>
      <section id='home'>
        <div className='w-full flex justify-center items-center h-[70vh] bg-[#f9db79]' style={{ backgroundImage: "url(https://www.freeiconspng.com/thumbs/ice-cream-png/ice-cream-png-transparent-9.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
          <div className='space-y-5'>
            <p className='tracking-widest	text-white font-bold text-2xl text-center'>HAND CREATED</p>
            <p className='tracking-widest	text-white font-bold text-7xl text-center'>ICE CREAM</p>
            <div className="flex justify-center space-x-5">
              {token == null ?
                <>
                  <Link href={'/signin'}><button className='bg-none border-[1px] p-2 px-5 border-white text-white font-bold hover:bg-white hover:text-black duration-500'>SIGN IN</button></Link>
                  <Link href={'/signup'}><button className='bg-none border-[1px] p-2 px-5 border-white text-white font-bold hover:bg-white hover:text-black duration-500'>SIGN UP</button></Link>
                </>
                :
                <Link href={'/mainpage'}><button className='bg-none border-[1px] p-2 px-5 border-white text-white font-bold hover:bg-white hover:text-black duration-500'>Home</button></Link>}
            </div>
          </div>
        </div>
      </section>

      <section id='flavors'>
        <div className="flex items-center justify-center">
          <div className='w-1/2'>
            <img src="https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          </div>

          <div className='w-1/2 h-full flex justify-center items-center px-24'>
            <div>
              <p className='tracking-widest	text-black font-bold text-3xl text-center'>OUR FLAVORS</p>
              <p className='tracking-widest	text-black font-bold text-2xl nav text-center'>Fresh n' Tasty!</p>
              <p className='text-center text-black font-light mt-5 text-lg '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque quasi perferendis officiis neque incidunt adipisci ipsa autem illum fugit, odit voluptates maxime iste facilis inventore alias pariatur. Ducimus, rerum quibusdam?</p>
              <button className='bg-none border-[1px] p-2 px-5 border-black text-black mt-5 font-bold mx-auto flex'>MENU</button>

            </div>
          </div>
        </div>
      </section>

      <section id='dairy'>
        <div className='w-full flex justify-center items-center h-[70vh] bg-[#b5e8d5]' style={{ backgroundImage: "url(https://www.freeiconspng.com/thumbs/ice-cream-png/ice-cream-png-transparent-9.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
          <div className='space-y-5'>
            <p className='tracking-widest	text-white font-bold text-2xl text-center'>ENJOY</p>
            <p className='tracking-widest	text-white font-bold text-7xl text-center'>DAIRY FREE</p>
            <button className='bg-none border-[1px] p-2 px-5 border-white text-white  font-bold mx-auto flex'>MENU</button>
          </div>
        </div>
      </section>

      <section id='place'>
        <div className="sm:flex items-center justify-center">

          <div className='sm:w-1/2 h-full flex justify-center items-center sm:px-24 px-3'>
            <div>
              <p className='tracking-widest	text-black font-bold text-3xl text-center'>OUR PLACE</p>
              <p className='tracking-widest	text-black font-bold text-2xl nav text-center'>For Cream By The Sea</p>
              <p className='text-center text-black font-light mt-5 text-lg '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque quasi perferendis officiis neque incidunt adipisci ipsa autem illum fugit, odit voluptates maxime iste facilis inventore alias pariatur. Ducimus, rerum quibusdam?</p>
              <button className='bg-none border-[1px] p-2 px-5 border-black text-black mt-5 font-bold mx-auto flex'>READ MORE</button>

            </div>
          </div>

          <div className='sm:w-1/2'>
            <img src="https://i.pinimg.com/736x/88/94/a0/8894a0f5d055275b449ca38a20e065e5--cold-stone-creamery-an-ice-cream.jpg" alt="" />
          </div>


        </div>
      </section>

      <section className='w-full h-[70vh]' style={{ backgroundImage: "url(https://media.istockphoto.com/photos/ice-cream-scoops-in-cones-with-copy-space-on-blue-picture-id1222009180?k=20&m=1222009180&s=170667a&w=0&h=hv4Js_y-DGIb0yLsi5vxSIqNIfmPuhv5lMCAVTw2xH0=)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></section>

    </>
  )
}


Home.getLayout = function getLayout(page) {
  return (
    <Default>
      {page}
    </Default>
  )
}