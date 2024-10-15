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





const Dashboard = () => {

    const [properties,setProperties] = useState([]);

    const fetchAllProperties = async()=>{
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL+'/property/get')
            console.log(response.data)
            setProperties(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()


    useEffect(()=>{
        fetchAllProperties()
    }
    ,[])
        

    const userLogout = async()=>{
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL+'/user/logout')
            console.log(response.data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
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
    

        <div className="flex min-w-full justify-center">
            <div className="relative max-w-[600px] w-full">
                <input className="border-2 rounded-full p-4 w-full" type="text"></input>
                <Button className="absolute top-0 right-0 px-8 py-6 mr-2 mt-[6px] rounded-full bg-red-600">Search</Button>
            </div>
        </div>


        <div className="mt-10 flex p-8 gap-4 justify-center">
            {properties.map((property,index)=><Card key={index} data={property}/>)}
        </div>

    </>

}


export default Dashboard;