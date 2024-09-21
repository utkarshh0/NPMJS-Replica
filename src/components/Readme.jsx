import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Badge from "./Badge";


export default function     Readme({packageInfo}){

    
    const latestVersion = packageInfo["dist-tags"].latest;
    return(
        <>
            <div className="flex">
                <div className="w-4/6 p-4 flex flex-col space-y-6">         
                    <div>
                        <p className="text-4xl font-medium bg-gray-100 w-fit p-1 my-2">{packageInfo.name}</p>
                        <hr className="my-2" />
                        <p className="my-2">{packageInfo.versions[latestVersion].description}</p>
                    </div>
                    <div>
                        <p className="text-3xl font-medium w-fit p-1 my-2">Documentation</p>
                        <hr className="my-2" />
                        <p className="my-2">See <a className="text-[#CB3844] font-bold" href={packageInfo.versions[latestVersion].homepage}>{packageInfo.versions[latestVersion].homepage}</a></p>
                    </div> 
                    <div>
                        <p className="text-3xl font-medium w-fit p-1 my-2">Keyword</p>
                        <hr className="my-2" />
                        <p className="my-2 text-[#CB3844] font-bold">{packageInfo.versions[latestVersion].keywords.map(item => item)}</p>
                    </div>                   
                </div>
            </div>
        </>
    )
}