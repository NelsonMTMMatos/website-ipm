import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import { Activity } from "@/types";
import Link from 'next/link';

interface Props {
    items: Activity[];
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#F0F8FF" : "white",
    zIndex: "999"
});

const ActivityDrawer = ({ items }: Props) => {
    return (
        <Droppable droppableId="activityDrawer" direction="horizontal">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="p-2 flex fixed bottom-16 left-0 right-0 h-36 overflow-x-auto overflow-y-hidden border-t-2"
                >
                    {items.length === 0 ? (
                        <div className="flex items-center justify-center w-full">
                            <Link href="/" className="text-blue-500 underline">
                                Discover More Activities for your trip.
                            </Link>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <ActivityCard key={item.id} item={item} index={index} verticalLayout={true} />
                        ))
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default ActivityDrawer;