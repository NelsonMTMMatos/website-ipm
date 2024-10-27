export interface Report {
    description: string;
    availability: boolean;
    stage_assigment: string;
};

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

export interface PastTrip {
    destination:string;
    start_date:string;
    end_date:string;
    year:number;
}