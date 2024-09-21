
export default function Badge({name, value}){

    return(
        <>
            <div className="p-3 border-b">
                <p className="text-gray-600 text-md font-medium">{name}</p>
                <p className="font-thick">{value}</p>
            </div>
        </>
    )
}