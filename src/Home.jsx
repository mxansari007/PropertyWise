import {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loading from "./components/Loading";
import svgBack from './assets/back.svg';


function Home() {
  const navigate = useNavigate();
    
  const {register,handleSubmit,watch,formState:{errors},control} = useForm({
    mode:"all"
  })

  const [loading,setLoading]= useState(false);

  const onSubmit = async (data)=>{
    setLoading(true);
    try{
        const res = axios({
            method:"POST",
            url:import.meta.env.VITE_API_URL+'/user/login',
            data:{
                email:data.email,
                password:data.password
            },
            withCredentials:true
        })

        navigate('dashboard')

        console.log(res.data)
    }
    catch(err){
        console.log(err)
    }
    setLoading(false);
  }



  return (
    <>
    <div className="p-4 text-3xl px-8 z-10">
      <h1 className="text-red-600">Property<span className="font-light text-black">Wise</span></h1>
      </div>
      <div className="flex md:flex-row flex-col">
            <div className="mt-10 flex-[2] md:flex-1 flex items-center justify-center">
        <img className="-z-10" src={svgBack} />
        </div>
    <div className="flex-[3] md:flex-1">
      <div className="flex justify-center items-center mt-10 md:mt-0 md:h-[100vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white  rounded-lg p-4 border-2 min-w-[350px] min-h-[400px] shadow-gray-100 shadow-lg rouded-lg">
          <div className="p-4">
            <h2 className="text-2xl text-center">Login</h2>
          </div>
          <div className='flex flex-col gap-4 p-4 justify-evenly'>
            <input {...register("email",{required:"Email not Entered"})} className="border-2 py-2 rounded-md px-2 text-xl"  placeholder="Enter Email" type="email"/>
            <p className="text-red-500">{errors.email?.message}</p>
           <input placeholder="Enter Password" {...register("password",{required:"Password Not Entered"})} className="border-2 py-2 rounded-md px-2 text-xl" type="password"/>
              <p className="text-red-500">{errors.password?.message}</p>
           <button className="bg-red-500 hover:bg-red-400 py-2 rounded-md text-white font-bold">Login</button>
           <button  className="bg-yellow-500 hover:bg-yellow-400 py-2 rounded-md text-white font-bold"  onClick={()=>{navigate('createAccount')}}>Create New Account</button>
          </div>
        </form>

      </div>
      </div>
      </div>
      {loading?<Loading/>:null}
   </>
  )
}




export default Home;


