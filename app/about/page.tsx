import React from 'react'
import Link from "next/link";

const About = () => {
  return (
    <div className=' pt-40 flex items-center justify-center text-6xl'>
      <span> Project Stages </span>
        <Link href={`/Assignments/G_21_stage1.pdf`} className='bg-sky-600 p-3 rounded-full text-white hover:bg-sky-800'>
            Stage 1 (Project Proposal)
        </Link>
    </div>
  )
}

export default About