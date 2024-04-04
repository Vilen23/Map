import React from 'react'
import InputBox from './InputBox'

export default function Navbar() {
  return (
    <div className='flex items-center flex-col justify-center '>
       <h1 className=' text-4xl pt-10 font-bold'>One Can set cordinates themselves</h1>
       <InputBox/>
    </div>
  )
}
