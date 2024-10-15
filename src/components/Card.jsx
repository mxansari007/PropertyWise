


const Card = ({data})=>{


    return <>
        <div className="max-w-[300px] max-h-[400px]">
            <div className="">
                <img className="rounded-md max-h-[200px] max-w-[200px]" src={data.images[0]} alt="property" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold">{data.title}</h2>
                <p className="text-sm">{data.description}</p>
                <p>{data.city}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-light">Price : {data.pricePerNight} $</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">View</button>
                </div>
            </div>
        </div>

    </>

}

export default Card;