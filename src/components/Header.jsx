
import { Link, useNavigate } from 'react-router-dom';
import { BsFillSuitHeartFill } from "react-icons/bs";


const Header = ({ searchTerm, setSearchTerm, onSearch }) => {
    const navigate = useNavigate();

    // Handles the form submission for search
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(navigate); // Calls the onSearch function, passing the navigate function
    };


    return (
        <header className="w-full px-4 py-5">
            <div className='flex items-baseline space-x-5 font-medium px-4 pb-4 border-b text-sm'>
                <span className='hover:text-gray-500'><BsFillSuitHeartFill /></span>
                <a href="#" className="hover:text-gray-500">Pro</a>
                <a href="#" className="hover:text-gray-500">Teams</a>
                <a href="#" className="hover:text-gray-500">Pricing</a>
                <a href="#" className="hover:text-gray-500">Documentation</a>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4">
                <div className="flex items-center justify-between px-4 md:w-auto">
                    <Link to="/">
                        <svg className="w-20" viewBox="0 0 780 250">
                            <path fill="#231F20" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path>
                        </svg>
                    </Link>
                    <div className="flex md:hidden">
                        <button className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 hover:bg-gray-100 mr-2">Sign Up</button>
                        <button className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">Sign In</button>
                    </div>
                </div>

                {/* Search form */}
                <form onSubmit={handleSubmit} className="relative flex-grow md:mx-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search packages"
                        className="w-full pl-10 pr-4 py-3 border border-[#0000000d] bg-[#0000000d] outline-none focus:border-black"
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <button className="absolute right-0 top-0 bottom-0 px-6 py-2 bg-black text-white font-semibold">
                        Search
                    </button>
                </form>

                <div className="hidden md:flex md:items-center">
                    <button className="px-4 py-4 text-sm font-medium text-black bg-white border border-gray-300 hover:bg-gray-100 mr-2">Sign Up</button>
                    <button className="px-4 py-4 text-sm font-medium text-black hover:bg-gray-100">Sign In</button>
                </div>
            </div>
        </header>
    );
};

export default Header;