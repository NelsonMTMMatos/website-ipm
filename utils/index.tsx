import { Trip } from '@/types';
import trips from '../data/trips.json'

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

export const dateToISOString = (date:Date) => {
    return date.toISOString().split('T')[0];
}

export const hasOverlap = (startDate:Date, endDate:Date) => {
    return trips.some(trip => {
        const tripStart = new Date(trip.start_date);
        const tripEnd = new Date(trip.end_date);
        
        return !(startDate > tripEnd || endDate < tripStart);
    });
}