"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/about",
        label: "About"
    }
]

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className='flex justify-between items-center py-4 px-7 border-b bg-black'>
    <div className='text-white h-12 w-12 flex justify-center items-center bg-sky-500 hover:bg-sky-700'>Logo</div>   
    <nav className='text-white'>
        <ul className='flex justify-center items-center gap-x-5'>
        {
            navLinks.map((link) => (
                <li key={link.href} className={`hover:text-zinc-400 ${ pathname === link.href ? "font-bold" : ""}`}>
                    <Link href={link.href}>
                    {link.label}
                    </Link>
                </li>))
        }
        </ul>
    </nav>
    </header>
  )
}

export default Navbar