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

export interface Trip {
    destination:string;
    start_date:string;
    end_date:string;
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