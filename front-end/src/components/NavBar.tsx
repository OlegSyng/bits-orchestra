import { useState } from "react"
import { cn } from "../utils/cn"
import { Link, NavLink } from "react-router-dom"

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white fixed top-0 start-0 border-b w-full z-20 border-gray-200 h-16">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              
                <Link to='/' className="flex items-center space-x-3">
                    <img src="public/vite.svg" className="h-8" alt="Vite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Plank Masters</span>
                </Link>
                
                <button onClick={() => setIsOpen((prev) => !prev)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <div className={cn("hidden w-full md:block md:w-auto", isOpen && 'block')}>
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <NavLink to='/' className={({isActive}) => cn("block py-2 px-3 text rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0", isActive && 'text-blue-700')}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to='/reviews' className={({isActive}) => cn("block py-2 px-3 text rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0", isActive && 'text-blue-700')}>Reviews</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}