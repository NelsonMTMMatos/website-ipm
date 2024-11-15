import { Trip } from '@/types';
import activities from '@/data/activities.json'

export const isPastTrip = (trip:Trip) => {
    const end = new Date(trip.end_date);
    const today = new Date();
    return end < today;
};

export const getTripYear = (trip:Trip) => {
    const end = new Date(trip.end_date);
    return end.getFullYear();
}

export const formatDateToShortString = (dateStr:string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const dateToISOString = (date:Date) => date.toISOString().split('T')[0];

export const hasOverlap = (trips: Trip[], startDate:Date, endDate:Date) => {
    return trips.some(trip => {
        const tripStart = new Date(trip.start_date);
        const tripEnd = new Date(trip.end_date);
        
        return !(startDate > tripEnd || endDate < tripStart);
    });
}

export const getActivityID = (pathName: string) => pathName.split('/')[pathName.split('/').length - 1];
  
export const isBetween = (startHour: string, endHour: string, hourToCompare: string) => {
    const start = Date.parse('01/01/1970 ' + startHour);
    const hour = Date.parse('01/01/1970 ' + hourToCompare);
    const end = Date.parse('01/01/1970 ' + endHour);
    return start <= hour && hour <= end;
}

export const getActivityIndex = (activityId: number) => activities.findIndex(a => a.id === activityId)

export const activityInTrip = (trip: Trip, activityId: number) => trip.activities.findIndex(a => a.id == activityId) != -1