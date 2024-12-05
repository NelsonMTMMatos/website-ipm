'use client';

import HeroCard from '@/components/Cards/HeroCard';
import members from '../../data/members.json';

const Members = () => {

  return (
    <>
      <div className=" my-5 flex items-center justify-center">
          <span className=" text-[60px]">Group 21</span>
      </div>
      <ul className="p-10 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap">
        {members.map((member, index) => (
          <HeroCard key={index} person={member}/>
        ))}
      </ul>
    </>
  )
}

export default Members