"use client"

import { getActivityID } from '@/utils/index';
import activities from '../../../data/activities.json'
import { usePathname } from 'next/navigation'
import { Activity } from '@/types';
import Image from 'next/image';
import ActivityCard from '@/components/Cards/ActivityCard';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ActivityPage = () => {
    const pathname = usePathname();
    const router = useRouter();

    const id = getActivityID(pathname)

    const activity = activities.find((activity: Activity) => activity.id.toString() === id);
      
    const handleBackClick = () => {
        router.back();
    };

    if (!activity) return <div>Activity not found</div>;

    const prevPath = sessionStorage.getItem('previousUrl')?.startsWith('/plans/') || null;

    return (
    <div className = 'flex flex-col items-center justify-center gap-y-2 px-4'>
        <div className="w-full flex items-center py-5 gap-x-4">
            <button onClick={handleBackClick}>
                <IoIosArrowBack size={32}/>
            </button>
            <div>
                <span className='text-2xl font-semibold'> {activity.name} </span>
            </div>
        </div>
        <div className=' relative w-[350px] h-auto aspect-4/3'>
            <Image
                src={"/Activities/" + activity.image}
                alt={activity.name}
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div className='w-full'>
            <p>{activity.description}</p>
        </div>
        <div className='w-full'>
            <p><b>Schedule:</b> {activity.opening_hours}-{activity.closing_hours}</p>
        </div>
        <div className='w-full'>
            <p><b>Time needed:</b> {activity.time_needed} hours</p>
        </div>
        <div className='w-full flex flex-col gap-y-3'>
            <div className='flex justify-start'>
                <span className='font-bold'>Similar activities</span>
            </div>
            <div className=' flex gap-x-3'>
                {activity.similar.map((id:number, index:number) => <ActivityCard activity={activities[id]} key={index}/>)}    
            </div>   
        </div>
        {!prevPath && 
            <div className=' mt-5 flex flex-col items-center justify-end'>
               <Link href={'/activities/' + id + '/plan'} className=' bg-deep-blue text-white px-4 py-2 rounded'>Add to Plan</Link>
           </div>
        }
    </div>)
}

export default ActivityPage