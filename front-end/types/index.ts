export type User = {
    name?: string;
    familyName?: string;
    email?: string;
    password?: string;
    role?: string;
    id?: number;
};

export type Activity = {
    activityName: string;
    description: string;
    finished: boolean;
    categoryName: string;
    date: string;
    user: User;
    location: Location;
    participants: Participant[];
    id: number;
};

export type Location = {
    name: string;
    locality: string;
    street: string;
    streetNumber: number;
    postalCode: number;
    capacity: number;
    id: number;
};

export type Participant = {
    name: string;
    email: string;
    id: number;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
