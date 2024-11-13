"use client"

import { getActivityID } from '@/utils/index';
import activities from '../../../data/activities.json'
import { usePathname } from 'next/navigation'
import { Activity } from '@/types';
import Image from 'next/image';
import ActivityCard from '@/components/Cards/ActivityCard';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const ActivityPage = () => {
    const pathname = usePathname();
    const router = useRouter();

    const id = getActivityID(pathname)

    const activity = activities.find((activity: Activity) => activity.id.toString() === id);
      
    const handleBackClick = () => {
        router.back();
    };

    if (!activity) return <div>Activity not found</div>;

    return <div className = 'flex flex-col items-center justify-center gap-y-2 px-4'>
        <div className="w-full flex items-center py-5 gap-x-4">
            <button onClick={handleBackClick}>
                <IoIosArrowBack size={32}/>
            </button>
            <div>
                <span className='text-2xl font-semibold'> {activity.name} </span>
            </div>
        </div>
        <Image src={"/Activities/" + activity.image} alt={activity.name} height={200} width={350} />
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
    </div>
}

export default ActivityPage