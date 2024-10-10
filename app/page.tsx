'use client';

import HeroCard from "@/components/HeroCard";
import data from '../data/data.json';

export default function Home() {

  return (
    <main>
        <div className=" my-5 flex items-center justify-center">
            <span className=" text-[60px]">Group 21</span>
        </div>
        <ul className="p-10 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap">
          {data.map((member, index) => (
            <HeroCard key={index} person={member}/>
          ))}
        </ul>
    </main>
  );
}
