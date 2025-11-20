import React from 'react'
import todo from './../assets/todo.png'
import Footer from './../components/Footer'
import { useState, useEffect } from 'react'
import { supabase } from './../libs/supabaseClient'
import { Link } from 'react-router-dom'

export default function ShowAllTodo() {
  //สร้าง State เพื่อเก็บข้อมูลที่ดึงมาจาก Table ใน Postgres บน Supabase
  const [todos, setTodos] = useState([])

  //ดึงข้อมูลจาก Table ใน Postgres บน Supabase ตอนที่หน้าจอ (Page Component) ถูก Render
  useEffect(()=>{
    //ฟังก์ชันดึงข้อมูลจาก Table ใน Postgres บน Supabase
    const fetchData = async () => {
      //ไปดึงมา
      const { data, error} = await supabase
                                   .from('todo_tb')
                                   .select('*')
     
      //หลังจากดึงมา ตรวจสอบก่อนว่ามี error หรือไม่
      if(error){
        alert('ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง...')
        return
      }          
      
      //ถ้าไม่มี error ให้เก็บข้อมูลไว้ใน State
      setTodos(data)      
    }

    //เรียกใช้ฟังก์ชันดึงข้อมูลให้ทำงาน
    fetchData()
  } , [])

  //สร้างฟังก์ชันจัดการการลบข้อมูล
  const handleDeleteClick = async (id) => {
    if( confirm('คุณต้องการลบข้อมูลนี้หรือไม่ ?') ){
      //ลบข้อมูลออกจาก Table ใน Prostgres บน Supabase
      const { error } = await supabase
                              .from('todo_tb')
                              .delete()
                              .eq('id', id)
      
      //ตรวจสอบว่ามี error ไหมจากการลบ
      if(error){
        alert('ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่อีกครั้ง...')
        return
      }

      //ลบข้อมูลออกจากตารางที่แสดงที่หน้าจอ
      setTodos(todos.filter((todo) => todo.id !== id))
    }    
  }

  return (
    <div>
      <div className='w-8/12 border border-gray-200 shadow p-10 mx-auto mt-30 rounded'>
        <img src={todo} alt="todo" className='w-30 mx-auto'/>
        
          <h1 className='text-3xl text-center font-bold mt-7 text-blue-700'>
            Todo Management V.1.0            
          </h1>

          <h1 className='text-xl text-center font-bold mt-4 text-blue-700'>
            ข้อมูลงานทั้งหมดที่ต้องทำ            
          </h1>

          <div className='mt-5 flex justify-end'>
            <Link to={'/addtodo'} className='bg-blue-500 hover:bg-blue-700 text-white 
                                              font-bold py-2 px-4 rounded'>
              เพิ่มงานใหม่
            </Link>
          </div>

          {/* ตารางแสดงข้อมูลที่ดึงมากจาก Supabase */}
          <table className='w-full border mt-5'>
            <thead>
              <tr className='text-center font-bold bg-gray-200'>
                <td className='border p-2'>No.</td>
                <td className='border p-2'>ชื่องาน</td>
                <td className='border p-2'>รายละเอียดงาน</td>
                <td className='border p-2'>สถานะงาน</td>
                <td className='border p-2'>ACTION</td>
              </tr>
            </thead>
            <tbody>
              {
                todos.map((todo, index)=>(
                  <tr key={todo.id}>
                    <td className='border p-2 text-center'>{index+1}</td>
                    <td className='border p-2'>{todo.todo_name}</td>
                    <td className='border p-2'>{todo.todo_detail}</td>
                    <td className='border p-2 text-center'>
                      {
                        todo.todo_complete == true ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'
                      }
                    </td>
                    <td className='border p-2 text-center'>
                      <Link to={'/updatetodo/'+todo.id}
                            className='text-green-500 hover:text-green-700 mr-3'>
                        แก้ไข
                      </Link>                     
                      |
                      <button onClick={()=>handleDeleteClick(todo.id)}
                              className='text-red-500 hover:text-red-700 ml-3
                                           cursor-pointer'>
                        ลบ
                      </button>                      
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>

      <Footer/>
    </div>
  )
}
