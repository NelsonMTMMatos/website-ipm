"use client"

import {usePathname, useRouter} from "next/navigation"
import ActivityDrawer from "@/components/scheduling/ActivityDrawer";
import DaySchedule from "@/components/scheduling/DaySchedule";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import {getActivityID} from "@/utils";
import activities from "@/data/activities.json";
import {Activity, Trip} from "@/types";

const PlanSchedule = () => {
    const getTripId = getActivityID // same logic
    const pathname = usePathname();
    const tripId = getTripId(pathname)

    const [trip, setTrip] = useState<Trip | null>(null);
    const [scheduleItems, setScheduleItems] = useState<Activity[]>([]);
    const [drawerItems, setDrawerItems] = useState<Activity[]>([]);

    useEffect(() => {
        const storedTrips = sessionStorage.getItem("trips");
        const trips: Trip[] = JSON.parse(storedTrips || "[]");
        const selectedTrip = trips.find((trip) => trip.id.toString() === tripId);
        if (selectedTrip) {
            setTrip(selectedTrip);
            setDrawerItems(selectedTrip.activities);
        }
    }, [tripId]);

    const handleRemoveItem = (id: number) => {
        setScheduleItems((prevItems) => {
            const itemToRemove = prevItems.find((item) => item.id === id);
            if (!itemToRemove) return prevItems;
            setDrawerItems((prevDrawerItems) => [...prevDrawerItems, itemToRemove]);
            return prevItems.filter((item) => item.id !== id);
        });
    };

    const reorder = (list: Activity[], startIndex: number, endIndex: number): Activity[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const move = (
        source: Activity[],
        destination: Activity[],
        droppableSource: { index: number; droppableId: string },
        droppableDestination: { index: number; droppableId: string }
    ): { [key: string]: Activity[] } => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result: { [key: string]: Activity[] } = {
            [droppableSource.droppableId]: sourceClone,
            [droppableDestination.droppableId]: destClone,
        };
        return result;
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
            const itemsNew = reorder(
                source.droppableId === "droppable" ? scheduleItems : drawerItems,
                source.index,
                destination.index
            );
            if (source.droppableId === "droppable") {
                setScheduleItems(itemsNew);
            } else {
                setDrawerItems(itemsNew);
            }
        } else {
            const result = move(
                source.droppableId === "droppable" ? scheduleItems : drawerItems,
                destination.droppableId === "droppable" ? scheduleItems : drawerItems,
                source,
                destination
            );
            setScheduleItems(result["droppable"]);
            setDrawerItems(result["activityDrawer"]);
        }
    };

    if (!trip) return <div>Loading...</div>;

    return (
        <div className="min-h-[calc(100vh-128px)] w-full flex flex-col items-center justify-center">
            <DragDropContext onDragEnd={onDragEnd}>
                <DaySchedule items={scheduleItems} onRemoveItem={handleRemoveItem} startTime={"09:00"}/>
                <ActivityDrawer items={drawerItems} />
            </DragDropContext>
        </div>
    );
};

export default PlanSchedule;