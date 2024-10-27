"use client";

import { Person } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
  
type Props = {
    person: Person;
}

const HeroCard = ({person}: Props) => {
  const { name, number, photo, assignment } = person;

  return (
    <div className='w-[400px] h-[500px] flex flex-col justify-center items-center gap-y-5 border-black border-2 rounded-xl'>
      <Image src={`/Members/${photo}`} alt={name} height={250} width={250}/>
      <div className='text-2xl'>{`${name} ${number}`}</div>
      <Link href={`/Assignments/${assignment}`} className='bg-sky-600 p-3 rounded-full text-white hover:bg-sky-800'>
        Show Assignment
      </Link>
    </div>
  );
}

export default HeroCard;
