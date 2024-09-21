import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LuDot } from 'react-icons/lu';
import { timeAgo } from '../utils/utils';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaRegCopy, FaRegFileZipper } from 'react-icons/fa6';
import { FiBox } from 'react-icons/fi';
import { BsBoxes } from 'react-icons/bs';
import { VscVersions } from 'react-icons/vsc';
import Button from '../components/Button'
import Readme from '../components/Readme'
import Versions from '../components/Versions'
import Badge from '../components/Badge';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const PackageDetailPage = () => {
    const { packageName } = useParams();
    const [packageInfo, setPackageInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleContent, setVisibleContent] = useState({
        readme: true,
        code: false,
        dependency: false,
        dependents: false,
        versions: false,
      });

    // Fetch package info 
    useEffect(() => {
        const fetchPackageInfo = async () => {
            try {
                const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
                setPackageInfo(response.data)
                console.log(response.data.time["18.3.1"])
            } catch (err) {
                setError('An error occurred while fetching package information. Please try again.');
                console.error('Package info fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackageInfo();
    }, [packageName]);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!packageInfo) return null;

    const latestVersion = packageInfo['dist-tags'].latest;

    const handleClick = (button) => {
        setVisibleContent({
          readme: button === 'readme',
          code: button === 'code',
          dependency: button === 'dependency',
          dependents: button === 'dependents',
          versions: button === 'versions',
        });
      };

      console.log(packageInfo.versions)
    return (
        <div className="w-full md:w-5/6 mx-auto px-2 py-4">
            <h1 className="text-xl font-bold">{packageInfo.name}</h1>
            <div className='flex items-center tracking-wider'>
                <p className="text-sm text-gray-600">{latestVersion}</p>
                <span className='text-2xl'><LuDot /></span>
                <p className='text-sm text-green-600'>Public</p>
                <span className='text-2xl'><LuDot /></span>
                <p className="text-sm text-gray-600"> Published &nbsp; {timeAgo(packageInfo.time[latestVersion])}</p>
            </div>
            <div className="w-fit md:w-full flex flex-col md:flex-row mx-auto md:justify-between items-center">
                <Button 
                    label="Readme" 
                    Icon={IoDocumentTextOutline} 
                    bgHoverColor="bg-[#FFF5D8]" 
                    borderColor="border-[#FFCD3A]" 
                    textColor="text-[#886701]"
                    handleClick={handleClick}
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Code" 
                    Icon={FaRegFileZipper} 
                    bgHoverColor="bg-[#FAEBEB]" 
                    borderColor="border-[#BC3433]" 
                    textColor="text-[#BC3433]"
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Dependency" 
                    Icon={FiBox} 
                    bgHoverColor="bg-[#FAEBF9]" 
                    borderColor="border-[#782075]" 
                    textColor="text-[#782075]"
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Dependents" 
                    Icon={BsBoxes} 
                    bgHoverColor="bg-[#EDE6FF]" 
                    borderColor="border-[#290089]" 
                    textColor="text-[#290089]"
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Versions" 
                    Icon={VscVersions} 
                    bgHoverColor="bg-[#D4EEF9]" 
                    borderColor="border-[#146C91]" 
                    textColor="text-[#146C91]"
                    handleClick={handleClick}
                    visibleContent={visibleContent}
                />
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className='w-full md:w-4/6 p-4'>
                    {visibleContent.readme &&
                        <div className='w-full'>
                            <Readme packageInfo={packageInfo}/> 
                        </div>
                    }
                    {visibleContent.versions &&
                        <div className='w-full'>
                            <Versions packageInfo={packageInfo}/>
                        </div>
                    }
                </div>

                <div className="w-full md:w-2/6 p-4">
                    <p className="text-gray-600 font-semibold my-2">Install</p>
                    <div className="p-2 border flex justify-between tracking-wider">
                        <div className="flex items-center space-x-2">
                            <MdOutlineKeyboardArrowRight />
                            <p className="text-gray-500">npm i {packageInfo._id}</p>
                        </div>
                        <button><FaRegCopy /></button>
                    </div>
                    
                    <Badge
                        name="Respository"
                        value={packageInfo.versions[latestVersion].repository.url.split("+")[1]}
                    />
                    <Badge
                        name="Homepage"
                        value={packageInfo.versions[latestVersion].homepage}
                    />
                   <div className="flex justify-between">
                        <Badge
                            name="File count"
                            value={packageInfo.versions[latestVersion].dist.fileCount}
                        />
                        <Badge
                            name="Unpacked Size"
                            value={Math.floor(packageInfo.versions[latestVersion].dist.unpackedSize/1000)+" KB"}
                        />
                   </div>
                   <Badge
                        name="Version"
                        value={latestVersion}
                    />
                </div>

            </div>
        </div>
    );
};

export default PackageDetailPage;