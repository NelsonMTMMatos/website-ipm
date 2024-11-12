import { Activity } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
    activity: Activity
}

const ActivityCard = ({activity}: Props) => {

    
    return(
        <Link href={'/activities/' + activity.id} className='flex flex-col items-center justify-center'>
            <Image src={"/Activities/" + activity.image} alt={activity.name} height={70} width={70} />
            <div>
                <span>{activity.name}</span>
            </div>
        </Link>
            
    );
}

export default ActivityCard