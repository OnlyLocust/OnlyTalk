import React, { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import Users from './components/users.jsx'
import Chat from './components/chat.jsx'

const App = () => {

  const [sender , setSender] = useState('')

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login setSender={setSender} sender={sender}></Login>}></Route>
          <Route path='/signup' element = {<Signup setSender = {setSender}></Signup>}></Route>
          <Route path='/users' element = {<Users  sender={sender} ></Users>}></Route>
          <Route path='/chat/:receiver' element={<Chat sender={sender} ></Chat>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
