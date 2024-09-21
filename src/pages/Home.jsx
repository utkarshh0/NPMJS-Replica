import BackgroundImage from "../assets/background.png";
import img from '../assets/img.png'

export default function Home(){
    return (
        <>
            <section className="relative overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${BackgroundImage})`,
                        filter: 'brightness(0.85)',
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center text-white">
                    <h1 className="text-4xl md:text-8xl font-semibold mb-6">Build amazing <br /> things</h1>
                    <p className="text-base md:text-lg mb-8 max-w-xl mx-auto my-12">
                        We&apos;re GitHub, the company behind the npm Registry and npm CLI. We
                        offer those to the community for free, but our day job is building and
                        selling useful tools for developers like you.
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold my-12">
                        Take your JavaScript <br /> development up a notch
                    </h2>
                    <p className="text-base md:text-lg mb-8 max-w-xl mx-auto">
                        Get started today for free, or step up to npm Pro to enjoy a premium
                        JavaScript development experience, with features like private packages.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full text-lg hover:bg-yellow-300 transition duration-300 shadow-4xl">
                            Sign up for free
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-red-500 transition duration-300">
                            Learn about Pro
                        </button>
                    </div>
                </div>
            </section>
            <section className="h-screen w-screen overflow-hidden flex justify-center">
                <div className="w-2/5 p-12 flex flex-col items-center">
                    <img className="w-28 my-4" src={img} alt="" />
                    <p className="text-4xl text-center font-bold my-4">Bring the best of open source to you, your team, and your company</p>
                    <p className="my-4 text-center">Relied upon by more than 17 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry has become the center of JavaScript code sharing, and with more than two million packages, the largest software registry in the world. Our other tools and services take the Registry, and the work you do around it, to the next level.</p>
                </div>
            </section>
        </>

    );
};