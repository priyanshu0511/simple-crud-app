import React, { useState } from 'react'
import { FaSun } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [lightMode, setLightMode] = useState(true);

  return (
    <div className={`${lightMode ? 'bg-slate-100' : 'bg-gray-950'}`}>
      <div className='flex justify-between items-center h-16 max-w-6xl mx-auto '>
        <Link to='/'>
          <div className='flex justify-between items-center text-2xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text '>
            PRODUCT STORE 🛒
          </div>
        </Link>
        <div className='flex gap-2'>
          <Link to='/create'>
            <button className={`${lightMode ? 'border-gray-950' : 'border-gray-100'} p-3 border rounded-md`}><MdOutlineAddBox size={25} color={lightMode ? '#393939' : `#f3f3f3`} /></button>
          </Link>
          <button onClick={() => setLightMode(lightMode => !lightMode)} className={`${lightMode ? 'border-gray-900' : 'border-gray-100'} p-3 border rounded-md`}>
            {!lightMode ? <FaSun size={25} color={lightMode ? '#393939' : `#f3f3f3`} />
              : <IoMoon size={25} color={lightMode ? '#393939' : `#f3f3f3`} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar