import {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Loading from './components/Loading';


const CreateAccount = ()=>{
    const [account,setAccount] = useState('New');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
  const {register,handleSubmit,watch,formState:{errors},control} = useForm({
    mode:"all"
  })

  const pass = watch("password");


  const onSubmit = async (data)=>{
    setLoading(true);
    try{
        const res = axios({
            method:"POST",
            url:import.meta.env.VITE_API_URL+'/user/register',
            data:{
                name:data.name,
                email:data.email,
                password:data.password
            }
        })

        console.log(res.data)
    }
    catch(err){
        console.log(err)
    }
    setLoading(false);
  }


  return <>
      <div className="p-4 text-3xl px-8 z-10">
      <h1 className="text-red-600">Property<span className="font-light text-black">Wise</span></h1>
      </div>
      <div className="flex justify-center items-center h-[100vh] ">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg p-4 border-2 min-w-[400px] min-h-[400px] shadow-zinc-100 shadow-lg rouded-lg">
          <div className="p-4">
            <h2 className="text-2xl text-center">Create New Account</h2>
          </div>
          <div className='flex flex-col gap-4 p-4 justify-evenly'>
            <input {...register("name",{required:"Name is required"})}  className={`${errors.name?'outline-red-600 outline-1':''} border-2 py-2 rounded-md px-2 text-xl`} placeholder="Enter Name" type="text"/>
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <input  {...register("email",{required:"Email is required"})}  className={`${errors.email?'outline-red-600 outline-1':''} border-2 py-2 rounded-md px-2 text-xl`}  placeholder="Enter Email" type="email"/>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
           <input {...register("password",{required:"password is required"})}  className="border-2 py-2 rounded-md px-2 text-xl" placeholder="Enter Password" type="password"/>
           {errors.password && <p className="text-red-500">{errors.password.message}</p>}
           <input {...register("confirmPass",{validate:value=>value==pass || "password do not match"})}   className="border-2 py-2 rounded-md px-2 text-xl" placeholder="Enter Confirm Password" type="password"/>
           {errors.confirmPass && <p className="text-red-500">{errors.confirmPass.message}</p>}
           <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 py-2 rounded-md text-white font-bold">Create New Account</button>
            <p className="text-center">Already Have an Account <span onClick={()=>{navigate('/')}} className="cursor-pointer text-red-500">Click Here</span></p>
          </div>
        </form>
        </div>
        <DevTool control={control} />
        {loading?<Loading />:null}
  </>

}


export default CreateAccount;