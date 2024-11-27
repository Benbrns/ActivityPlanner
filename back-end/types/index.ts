type UserInput = {
    name?: string;
    familyName?: string;
    email?: string;
    password?: string;
    role?: Role;
    id?: number;
};

type ActivityInput = {
    activityName?: string;
    description?: string;
    finished?: boolean;
    categoryName?: string;
    date?: Date;
    userEmail?: string;
    locationName?: string;
    id?: number;
};

type LocationInput = {
    name?: string;
    locality?: string;
    street?: string;
    streetNumber?: number;
    postalCode?: number;
    capacity?: number;
    id?: number;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: string;
};

type Role = 'admin' | 'user' | 'guest';

export { UserInput, ActivityInput, LocationInput, AuthenticationResponse, Role };
