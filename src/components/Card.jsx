


const Card = ({data})=>{


    return <>
        <div className="max-w-[300px] max-h-[400px]">
            <div className="">
                <img className="rounded-md max-h-[200px] w-full" src={data.images[0]} alt="property" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold">{data.title}</h2>
                <p className="text-sm">{data.description}</p>
                <p><span className="font-bold">City :</span> {data.city}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-light"><span className="font-bold">Price :</span> {data.pricePerNight} $</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">View</button>
                </div>
            </div>
        </div>

    </>

}

export default Card;