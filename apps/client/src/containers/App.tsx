import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <BrowserRouter>
    <div 
    className='text-black bg-cover flex flex-col min-h-screen'>
      <div>
        <ToastContainer position='bottom-left' />
      </div>    
    </div>
    </BrowserRouter>

  )
}

export default App
