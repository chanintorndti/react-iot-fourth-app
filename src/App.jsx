import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddTodo from './pages/AddTodo'
import UpdateTodo from './pages/UpdateTodo'
import ShowAllTodo from './pages/ShowAllTodo'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addtodo" element={<AddTodo />} />
          <Route path="/updatetodo/:id" element={<UpdateTodo />} />
          <Route path="/showalltodo" element={<ShowAllTodo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
