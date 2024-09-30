'use client';

import HeroCard from "@/components/HeroCard";
import data from '../data/data.json';

export default function Home() {

  return (
    <main>
        <ul className="p-10 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap">
          {data.map((member, index) => (
            <HeroCard key={index} person={member}/>
          ))}
        </ul>
    </main>
  );
}
