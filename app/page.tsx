'use client';

import HeroCard from "@/components/HeroCard";
import data from '../data/data.json';

export default function Home() {

  return (
    <main>
      <ul className="p-10 flex justify-between items-center flex-wrap lg:flex-nowrap">
        {data.map((member, index) => (
          <HeroCard key={index} person={member}/>
        ))}
      </ul>
    </main>
  );
}
