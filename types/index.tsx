export interface Report {
    description: string;
    availability: boolean;
    stage_assigment: string;
}

export interface Person {
    name: string;
    number: number;
    photo: string;
    assignment: string;
}

export interface Activity {
    id:number,
    name:string;
    latitude:number,
    longitude:number,
    image: string,
    description: string,
    opening_hours: string,
    closing_hours: string,
    time_needed: number,
    tags: string[],
    similar: number[],
    price: number
}

export interface Trip {
    id: number
    destination: string;
    start_date: string;
    end_date: string;
    numberOfTravelers?: number;
    dayStartTime?: string;
    dayEndTime?: string;
    modeOfTransportation?: string
    activities: Activity[]
}

export type FormFields = {
    destination: string;
    start_date: Date;
    end_date: Date;
    numberOfTravelers?: number;
    dayStartTime?: string;
    dayEndTime?: string;
    modeOfTransportation?: string
}

export type City = {
    id?: string;
    name: string;
    lat: string;
    lng: string;
    country: string;
    admin1: string | null;
    lon?: string;
    pop?: string;
}