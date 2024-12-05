"use client"

import {usePathname} from "next/navigation"
import ActivityDrawer from "@/components/scheduling/ActivityDrawer";
import DaySchedule from "@/components/scheduling/DaySchedule";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import {getActivityID} from "@/utils";
import {Activity, Trip} from "@/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { WiDaySunny, WiRain } from "react-icons/wi";
import Link from "next/link";
import { format } from "date-fns";

const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const saveSchedulesToLocalStorage = (tripId: string, schedules: { [key: string]: Activity[] }) => {
    localStorage.setItem(`schedules_${tripId}`, JSON.stringify(schedules));
};

const loadSchedulesFromLocalStorage = (tripId: string): { [key: string]: Activity[] } => {
    const storedSchedules = localStorage.getItem(`schedules_${tripId}`);
    return storedSchedules ? JSON.parse(storedSchedules) : {};
};

const getWeatherIcon = (weather: string) => {
    const style = {
        color: weather === 'sunny' ? 'orange' : 'blue',
    };

    switch (weather) {
        case "sunny":
            return <WiDaySunny size={32} style={style} />;
        case "raining":
            return <WiRain size={32} style={style} />;
        default:
            return null;
    }
};

const PlanSchedule = () => {
    const getTripId = getActivityID;
    const pathname = usePathname();
    const tripId = getTripId(pathname);

    const [trip, setTrip] = useState<Trip | null>(null);
    const [scheduleItems, setScheduleItems] = useState<Activity[]>([]);
    const [drawerItems, setDrawerItems] = useState<Activity[]>([]);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [totalDays, setTotalDays] = useState<number>(1);

    useEffect(() => {
        const storedTrips = sessionStorage.getItem("trips");
        const trips: Trip[] = JSON.parse(storedTrips || "[]");
        const selectedTrip = trips.find((trip) => trip.id.toString() === tripId);
        if (selectedTrip) {
            setTrip(selectedTrip);
            const days = calculateDays(selectedTrip.start_date, selectedTrip.end_date);
            setTotalDays(days);
            const schedules = loadSchedulesFromLocalStorage(tripId);
            setScheduleItems(schedules[`day_${currentDay}`] || []);

            // Filter out scheduled items from drawer items
            const scheduledItemIds = new Set(Object.values(schedules).flat().map(item => item.id));
            const filteredDrawerItems = selectedTrip.activities.filter(item => !scheduledItemIds.has(item.id));
            setDrawerItems(filteredDrawerItems);
        }
    }, [tripId]);

    useEffect(() => {
        if (trip) {
            const schedules = loadSchedulesFromLocalStorage(tripId);
            setScheduleItems(schedules[`day_${currentDay}`] || []);
        }
    }, [currentDay, trip, tripId]);

    useEffect(() => {
        if (trip) {
            const schedules = loadSchedulesFromLocalStorage(tripId);
            schedules[`day_${currentDay}`] = scheduleItems;
            saveSchedulesToLocalStorage(tripId, schedules);
        }
    }, [scheduleItems, trip, tripId, currentDay]);

    const handleRemoveItem = (id: number) => {
        setScheduleItems((prevItems) => {
            const itemToRemove = prevItems.find((item) => item.id === id);
            if (!itemToRemove) return prevItems;
            setDrawerItems((prevDrawerItems) => [...prevDrawerItems, itemToRemove]);
            return prevItems.filter((item) => item.id !== id);
        });
    };

    const handleDayChange = (direction: "prev" | "next") => {
        const newDay = direction === "prev" ? currentDay - 1 : currentDay + 1;
        if (newDay >= 1 && newDay <= totalDays) {
            setCurrentDay(newDay);
        }
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

    const getCurrentTripDate = () => {
        const startDate = new Date(trip.start_date);
        startDate.setDate(startDate.getDate() + (currentDay - 1));
        return startDate;
    };

    const formattedDate = getCurrentTripDate()
        ? format(getCurrentTripDate(), "EEEE, dd.MM.yyyy")
        : "";

    return (
        <div className="min-h-[calc(100vh-128px)] w-full flex flex-col items-center">
            <div className="w-full flex items-center py-5">
                <Link href="/plans">
                    <IoIosArrowBack size={64} />
                </Link>
                <span className="text-4xl">Trip to {trip.destination}</span>
            </div>
            <div className="w-full flex justify-center items-center pb-5">
                <button onClick={() => handleDayChange("prev")} disabled={currentDay === 1}>
                    <IoIosArrowBack size={32} />
                </button>
                <div className="flex flex-col items-center mx-4 text-xl">
                    <span>Day {currentDay} of {totalDays}</span>
                </div>
                <button onClick={() => handleDayChange("next")} disabled={currentDay === totalDays}>
                    <IoIosArrowForward size={32} />
                </button>
            </div>
            <div className="w-full flex flex-col items-center">
                <span className="text-xl">{formattedDate}</span> {/* Add this */}
                {getWeatherIcon(currentDay === 2 ? "raining" : "sunny")}
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <DaySchedule items={scheduleItems} onRemoveItem={handleRemoveItem} startTime={"09:00"} weather={currentDay === 2 ? "raining" : "sunny"} />
                <ActivityDrawer items={drawerItems} />
            </DragDropContext>
        </div>
    );
};

export default PlanSchedule;