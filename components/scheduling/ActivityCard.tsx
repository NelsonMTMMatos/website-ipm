import React, { useEffect } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { CSSProperties } from "react";
import { Activity } from "@/types";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const getItemStyle = (isDragging: boolean, draggableStyle: CSSProperties = {}): CSSProperties => ({
    ...draggableStyle,
    zIndex: isDragging ? "9999" : "0",
});

interface ActivityProps {
    item: Activity;
    index: number;
    verticalLayout?: boolean;
    warningMessage?: string;
    onRemove?: (id: number) => void;
    scheduleTime?: string; // New prop for the schedule time
}

const calculateEndTime = (startTime: string, timeNeeded: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes, 0, 0);
    endTime.setMinutes(endTime.getMinutes() + timeNeeded * 60);
    return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ActivityCard = ({
    item,
    index,
    verticalLayout = false,
    warningMessage = "",
    onRemove,
    scheduleTime,
  }: ActivityProps) => {
    const endTime = scheduleTime ? calculateEndTime(scheduleTime, item.time_needed) : "";
  
    useEffect(() => {
      sessionStorage.setItem("previousUrl", location.pathname);
    }, []);
  
    return (
      <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
            className={`p-2 border rounded flex-shrink-0 bg-white relative ${
              verticalLayout
                ? "flex flex-col items-center w-36 mx-1"
                : "flex items-center w-full my-1"
            }`}
          >
            {!verticalLayout && (
              <button
                onClick={() => {
                  onRemove && onRemove(item.id);
                }}
                className="absolute top-1 right-1 text-red-500"
              >
                <RxCross2 size={20} />
              </button>
            )}
            <Link href={"/activities/" + item.id}>
              <div className={`${
              verticalLayout
                ? "flex flex-col items-center w-36 mx-1"
                : "flex items-center w-full my-1"
            }`}>
                <img
                  src={"/Activities/" + item.image}
                  alt={item.name}
                  className="w-16 h-12 flex-shrink-0"
                />
                <div className={`flex-grow ${verticalLayout ? "text-center mt-2" : "ml-4"}`}>
                  {scheduleTime && (
                    <div className="font-bold mb-1">
                      {scheduleTime} - {endTime}
                    </div>
                  )}
                  <div className="font-bold">{item.name}</div>
                  <div className={verticalLayout ? "hidden" : ""}>
                    {`Time needed: ${item.time_needed}h`}
                  </div>
                  <div className={verticalLayout ? "text-xs" : ""}>
                    {`open ${item.opening_hours} - ${item.closing_hours}`}
                  </div>
                  {warningMessage != "" && !verticalLayout && (
                    <div className="text-red-500">{warningMessage}</div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}
      </Draggable>
    );
  };
  
  export default ActivityCard;