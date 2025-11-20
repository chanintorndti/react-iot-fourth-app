import React from 'react'
import todo from './../assets/todo.png'
import Footer from './../components/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from './../libs/supabaseClient'

export default function AddTodo() {  
  //สร้าง State เพื่อเก็บข้อมูลที่ต้องจัดการบน Component
  const [todo_name, setTodoName] = useState('')
  const [todo_detail, setTodoDetail] = useState('')
  const [todo_complete, setTodoComplete] = useState(false)

  //ฟั้งก์ชันสําหรับการบันทึกข้อมูลไปยัง Table ใน Postgres บน Supabase
  const handleSaveClick = async () => {
    //บันทึกข้อมูลไปยัง Table ใน Postgres บน Supabase
    const { error } = await supabase
                            .from('todo_tb')
                            .insert({
                              todo_name: todo_name,
                              todo_detail: todo_detail,
                              todo_complete: todo_complete
                            })     

    //ตรวจสอบ Error
    if(error){
      alert('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง...')
      return;
    }

    //แสดงข้อความแจ้งผล และ redirect กลับไปที่หน้าจอ /showalltodo
    alert('บันทึกข้อมูลเรียบร้อยแล้ว...')
    window.location.href = '/showalltodo'    
  }

  return (
    <div>
      <div className='w-8/12 border border-gray-200 shadow p-10 mx-auto mt-30 rounded'>
        <img src={todo} alt="todo" className='w-30 mx-auto'/>
        
          <h1 className='text-3xl text-center font-bold mt-7 text-blue-700'>
            Todo Management V.1.0            
          </h1>

          <h1 className='text-xl text-center font-bold mt-4 text-blue-700'>
            เพิ่มข้อมูลงาน           
          </h1>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              ชื่องาน
            </label>
            <input
              value={todo_name} onChange={(e) => setTodoName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter todo name..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              รายละเอียดงาน
            </label>
            <input
              value={todo_detail} onChange={(e) => setTodoDetail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter todo detail..."
            />
          </div>

          {/* เสร็จ ไม่เสร็จ */}
          <div className="my-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              สถานะงาน
            </label>
            <select className='w-full border p-2 rounded' 
                    value={todo_complete == true? '1' : '0'}
                    onChange={(e) => setTodoComplete(e.target.value == '1'? true : false)}
                    >
              <option value="1">✅ เสร็จ</option>
              <option value="0">❌ ไม่เสร็จ</option>
            </select>
          </div>

          <button  onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white w-full
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            บันทึกเพิ่มงาน
          </button>

          <Link to='/showalltodo' className='block w-full text-center mx-auto mt-5'>           
              กลับไปหน้าแสดงข้อมูลงาน
          </Link>

          
      </div>

      <Footer/>
    </div>
  )
}
