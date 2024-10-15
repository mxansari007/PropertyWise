import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import Card from "./components/Card"
import {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Loading from './components/Loading'




const Dashboard = () => {

    const [properties,setProperties] = useState([]);
    const [loading,setLoading] = useState(false);
    const [city,setCity] = useState('');
    const [minRange,setMinRange] = useState(0);
    const [maxRange,setMaxRange] = useState(5000);

    const fetchAllProperties = async()=>{
        setLoading(true);
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL+'/property/get')
            console.log(response.data)
            setProperties(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    const navigate = useNavigate()


    useEffect(()=>{
        fetchAllProperties()
    }
    ,[])




    useEffect(()=>{
        console.log(city);
    },[city])
        

    const userLogout = async()=>{
        try {
            const response = await axios({
                method:'GET',
                url:import.meta.env.VITE_API_URL+'/user/logout',
                withCredentials:true
            })
            console.log(response.data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const searchValue = async ()=>{
        setLoading(true);
        try{
            const res = await axios({
                method:'POST',
                url:import.meta.env.VITE_API_URL+'/property/getPropertyFromCity',
                withCredentials:true,
                data:{city:city}
            })

            setProperties(res.data);
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    const searchRange = async ()=>{
        setLoading(true);
        try{
            const res = await axios({
                method:'POST',
                withCredentials:true,
                url:import.meta.env.VITE_API_URL + '/property/range',
                data:{min:minRange,max:maxRange}
            })

            setProperties(res.data);


        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }


    return <>
        <div className="flex justify-between p-4 px-6 text-red-600">
            <h1>Property<span className="font-light text-black">Wise</span></h1>

            <DropdownMenu>
  <DropdownMenuTrigger>
        <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{console.log('logut');userLogout()}}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
    

        <div className="flex min-w-full justify-center items-center flex-col">
            <div className="relative max-w-[600px] w-full">
                <input placeholder="Enter City" onChange={(e)=>setCity(e.target.value)} className="border-2 rounded-full p-4 w-full" type="text"></input>
                <Button onClick={()=>searchValue()} className="absolute top-0 right-0 px-8 py-6 mr-2 mt-[6px] rounded-full bg-red-600">Search</Button>
            </div>
            <div className="max-w-[600px] min-w-[200px] mt-10">
                <p className="text-center text-xl mb-2">Enter Range:</p>
                <div className="flex">
                <input onChange={(e)=>setMinRange(e.target.value)} className="border-2 rounded-full p-4"/> - <input onChange={(e)=>setMaxRange(e.target.value)}  className="border-2 rounded-full p-4"/>
                </div>
                <Button onClick={()=>searchRange()} className="w-full px-8 py-6 mr-2 mt-[6px] rounded-full bg-red-600">Search</Button>

            </div>
        </div>


        <div className="p-20 mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 justify-center">
            {properties.map((property,index)=><Card key={index} data={property}/>)}
        </div>
        {loading?<Loading/>:null}
    </>

}


export default Dashboard;