import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import { Activity } from "@/types";

interface Props {
    items: Activity[];
    onRemoveItem: (id: number) => void;
    startTime?: string;
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#F0F8FF" : "transparent",
});

const calculateScheduleTimes = (items: Activity[], startTime: string = "09:00"): { time: string, warning: string }[] => {
    const scheduleTimes: { time: string, warning: string }[] = [];
    let currentTime = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    currentTime.setHours(startHour, startMinute, 0, 0);

    items.forEach((item, index) => {
        const openingTime = new Date();
        const [openingHour, openingMinute] = item.opening_hours.split(":").map(Number);
        openingTime.setHours(openingHour, openingMinute, 0, 0);

        const closingTime = new Date();
        const [closingHour, closingMinute] = item.closing_hours.split(":").map(Number);
        closingTime.setHours(closingHour, closingMinute, 0, 0);

        if (index === 0) {
            currentTime = currentTime < openingTime ? openingTime : currentTime;
        } else {
            currentTime.setMinutes(currentTime.getMinutes() + items[index - 1].time_needed * 60 + 30);
        }

        if (currentTime < openingTime) {
            currentTime = openingTime;
        }

        const scheduleTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let warning = "";

        const endTime = new Date(currentTime);
        endTime.setMinutes(endTime.getMinutes() + item.time_needed * 60);

        if (currentTime < openingTime || endTime > closingTime) {
            warning = `Scheduled outside of opening hours`;
        }
        scheduleTimes.push({ time: scheduleTime, warning });
    });

    return scheduleTimes;
};

const DaySchedule = ({ items, onRemoveItem, startTime = "09:00" }: Props) => {
    const [scheduleTimes, setScheduleTimes] = useState<{ time: string, warning: string }[]>([]);
    const [warningMessage, setWarningMessage] = useState<string>("");

    useEffect(() => {
        const times = calculateScheduleTimes(items, startTime);
        setScheduleTimes(times);

        if (items.length > 0) {
            const [startHour, startMinute] = startTime.split(":").map(Number);
            const startDateTime = new Date();
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const [firstActivityHour, firstActivityMinute] = items[0].opening_hours.split(":").map(Number);
            const firstActivityDateTime = new Date();
            firstActivityDateTime.setHours(firstActivityHour, firstActivityMinute, 0, 0);

            const timeDifference = (firstActivityDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

            if (timeDifference > 1) {
                setWarningMessage("You have time for another activity in the morning before " + items[0].name + " opens");
            } else {
                setWarningMessage("");
            }
        } else {
            setWarningMessage("");
        }
    }, [items, startTime]);

    return (
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={"w-10/12 p-8 min-h-96 flex flex-col border-dashed my-32 " + (items.length === 0 ? "border-2" : "border-l-4 border-gray-300")}
                >
                    {warningMessage && (
                        <div className="text-center text-gray-500 py-3">{warningMessage}</div>
                    )}
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 pt-40">Drag and drop activities here to schedule</div>
                    ) : (
                        items.map((item, index) => (
                            <ActivityCard
                                key={item.id}
                                item={item}
                                index={index}
                                verticalLayout={false}
                                onRemove={onRemoveItem}
                                scheduleTime={scheduleTimes[index]?.time}
                                warningMessage={scheduleTimes[index]?.warning}
                            />
                        ))
                    )}
                    {items.length === 1 ? (
                        <div className="text-center text-gray-500 py-3">Drag and drop more activities to schedule</div>
                    ) : ("")}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DaySchedule;