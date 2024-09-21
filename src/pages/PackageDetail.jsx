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

    if (isLoading) return <div className="h-screen w-screen"><p className="text-center">Loading...</p></div>;
    if (error) return <div className="h-screen w-screen"><p className="text-center text-red-600">{error}</p></div>
    if (!packageInfo) return null;

    const latestVersion = packageInfo['dist-tags'].latest;

    // Handle clicks on PackageDetails Tab
    const handleClick = (button) => {
        setVisibleContent({
          readme: button === 'readme',
          code: button === 'code',
          dependency: button === 'dependency',
          dependents: button === 'dependents',
          versions: button === 'versions',
        });
      };

      const handleCopy = () => {
        navigator.clipboard.writeText(`npm i ${packageInfo._id}`)
          .then(() => {
            alert('Copied to clipboard!')
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      };

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
                    handleClick={handleClick}
                    styles={`hover:bg-[#FFF5D8] border-[#FFCD3A] text-[#886701] ${visibleContent.readme && `bg-[#FFF5D8]`}`}
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Code" 
                    Icon={FaRegFileZipper} 
                    styles="hover:bg-[#FAEBEB] border-[#BC3433] text-[#BC3433]"
                    visibleContent={visibleContent}
                />
               <Button 
                    label="Dependency" 
                    Icon={FiBox} 
                    styles="hover:bg-[#FAEBF9] border-[#782075] text-[#782075]"
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Dependents" 
                    Icon={BsBoxes} 
                    styles="hover:bg-[#EDE6FF] border-[#290089] text-[#290089]"
                    visibleContent={visibleContent}
                />
                <Button 
                    label="Versions" 
                    Icon={VscVersions} 
                    handleClick={handleClick}
                    styles={`hover:bg-[#D4EEF9] border-[#146C91] text-[#146C91] ${visibleContent.versions && `bg-[#D4EEF9]`}`}
                    visibleContent={visibleContent}
                />
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                
                {/* Selected Tab Information */}
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
                
                {/* Package Information */}
                <div className="w-full md:w-2/6 p-4">
                    <p className="text-gray-600 font-semibold my-2">Install</p>
                    <div className="p-2 border flex justify-between tracking-wider">
                        <div className="flex items-center space-x-2">
                            <MdOutlineKeyboardArrowRight />
                            <p className="text-gray-500">npm i {packageInfo._id}</p>
                        </div>
                        <button onClick={handleCopy}><FaRegCopy /></button>
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