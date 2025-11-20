import React from 'react'
import Footer from './../components/Footer'
import todo from './../assets/todo.png'
import { useState } from 'react'

export default function Home() {

  const [secureCode, setSecureCode] = useState('')

  const handleAccessClick = () =>{
    if(secureCode.trim() == ''){
      alert("ป้อน Secure Code ด้วย...")
      return;
    }

    if(secureCode.trim().toLowerCase() == 'iotsau'){
      window.location.href = '/showalltodo'
    }else{
      alert("Secure Code ไม่ถูกต้อง...");
    }
  }

  return (
    <div>
      <div className='w-8/12 border border-gray-200 shadow p-10 mx-auto mt-30 rounded'>
        <img src={todo} alt="todo" className='w-50 mx-auto'/>

        <h1 className='text-3xl text-center font-bold mt-10 text-blue-700'>
          Todo Management V.1.0
        </h1>

        <input value={secureCode} onChange={(e) => setSecureCode(e.target.value)}
               type="text" placeholder="Enter secure code to access web..."
               className="p-3 mt-8 w-full border rounded" />

        <button   onClick={handleAccessClick}
                  className='p-3 mt-5 w-full bg-red-700 hover:bg-red-800
                          text-white rounded cursor-pointer'>
          เข้าสู่ระบบ
        </button>        
      </div>

      <Footer/>
    </div>
  )
}
