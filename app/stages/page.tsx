import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import stages from '../../data/stages.json';
import right_arrow from '../../public/icons/arrow-right.svg';

interface Report {
  description: string;
  availability: boolean;
  stage_assigment: string;
}

const About = () => {
  return (
    <div className='py-20 px-40 gap-y-20 flex flex-col items-start justify-center'>
      <span className='text-6xl'> Project Stages </span>
      <div className='flex flex-col items-start w-full'>
        {stages.map((report, index) => (
          <Link
            key={index}
            href={`/Assignments/${report.stage_assigment}`}
            className={`group py-8 w-full flex justify-between items-center border-t-[1px] 
                      border-[#666767]/30 ${index === stages.length - 1 && 'border-b-[1px]'}`}
          >
            <div className=' flex flex-col items-start justify-between transition-all duration-500 group-hover:ml-4'>
              <span className={`text-2xl`}>{report.description}</span>
              <span className={`${report.availability ? 'text-lime-500' : ' text-red-400'}`}>
                {report.availability ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div>
              <Image src={right_arrow} alt='' width={50} height={50}  className='transition-all duration-500 group-hover:mr-4'/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default About;
