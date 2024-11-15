"use client"

import { usePathname } from "next/navigation"

const PlanSchedule = () => {
    const pathname = usePathname()

    const planId = pathname.split('/')[pathname.split('/').length - 1]

    return (
        <div className=" min-h-screen w-full flex flex-col items-center justify-center">
            <span className=" text-4xl"> Plan {planId} Schedule</span>
        </div>
    )
}


export default PlanSchedule