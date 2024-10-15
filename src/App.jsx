import {useState} from "react";
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import {Routes,Route} from 'react-router-dom'
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import CreateAccount from "./CreateAccount.jsx";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
   </>
  )
}


export default App
