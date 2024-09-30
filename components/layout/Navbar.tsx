"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import bars from '../../public/icons/bars.svg'
import cross from '../../public/icons/cross.svg'

const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/stages",
        label: "Project Stages"
    }
]

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  

  const handleDropdownMenuClick = () => {
    setDropdownMenu( prev => !prev)
  }

  return (
    <header className=' bg-blue-950 text-white'>
        <nav className=' px-4 py-10 h-16 flex items-center justify-between md:px-10'>
            <Link href={'/'} className='h-12 w-12 flex items-center justify-center bg-sky-500 hover:bg-sky-700'>Logo</Link>
            <div className={`absolute max-md:bg-blue-950  ${dropdownMenu ? 'top-20' : '-top-full'} left-0 w-full py-4 text-lg 
                             flex flex-col md:static md:flex-row md:items-center md:justify-end md:visible`}>
                <ul className=' flex flex-col items-center gap-6 md:flex-row'>
                {
                    navLinks.map((link) => (
                        <li key={link.href} className={`hover:text-zinc-400 ${ pathname === link.href ? "font-bold" : ""}`}>
                            <Link href={link.href}>
                            {link.label}
                            </Link>
                        </li>))
                }
                </ul>
            </div>
            <div onClick={handleDropdownMenuClick} className='md:hidden'>
                {
                    dropdownMenu ? <Image src={cross} alt='' height={30} width={30}/> : 
                                   <Image src={bars} alt='' height={30} width={30}/>
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar