import {
    User as UserPrisma,
    Activity as ActivityPrisma,
    Location as LocationPrisma,
    Participant as ParticipantPrisma,
} from '@prisma/client';
import { User } from './user';
import { Location } from './location';
import { Participant } from './participant';

export class Activity {
    readonly activityName: string;
    readonly description: string;
    readonly finished?: boolean;
    readonly categoryName: string;
    readonly date: Date;
    readonly user: User;
    readonly location: Location;
    readonly participants?: Participant[];
    readonly id?: number;

    constructor(activity: {
        activityName: string;
        description: string;
        finished?: boolean;
        categoryName: string;
        date: Date;
        user: User;
        location: Location;
        participants?: Participant[];
        id?: number;
    }) {
        this.validate(activity);
        this.activityName = activity.activityName;
        this.description = activity.description;
        this.finished = false;
        this.categoryName = activity.categoryName;
        this.date = activity.date;
        this.user = activity.user;
        this.location = activity.location;
        this.participants = activity.participants;
        this.id = activity.id;
    }
    validate(activity: {
        activityName: string;
        description: string;
        finished?: boolean;
        categoryName: string;
        date: Date;
        user: User;
        location: Location;
        id?: number;
    }) {
        // const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        if (!activity.activityName && !activity.activityName.trim()) {
            throw new Error('activityName cannot be empty');
        }
        if (!activity.description && !activity.description.trim()) {
            throw new Error('description cannot be empty');
        }
        if (!activity.categoryName && !activity.categoryName.trim()) {
            throw new Error('categoryName cannot be empty');
        }
        // if (!activity.date || !iso8601Regex.test(activity.date.toISOString())) {
        //     throw new Error('date is not in the correct format or is empty');
        // }
        if (!activity.user) {
            throw new Error('user cannot be empty');
        }
        if (!activity.location) {
            throw new Error('location cannot be empty');
        }
    }

    equals({ activityName, description, finished, categoryName, date, participants, id }): boolean {
        return (
            this.activityName === activityName &&
            this.description === description &&
            this.finished === finished &&
            this.categoryName === categoryName &&
            this.date === date &&
            this.participants === participants &&
            this.id === id
        );
    }

    static from({
        id,
        activityName,
        description,
        finished,
        categoryName,
        date,
        user,
        location,
        participants,
    }: ActivityPrisma & {
        user: UserPrisma;
        location: LocationPrisma;
        participants: ParticipantPrisma[];
    }) {
        return new Activity({
            id,
            activityName,
            description,
            finished,
            categoryName,
            date,
            user: User.from(user),
            location: Location.from(location),
            participants: participants.map((participant) => Participant.from(participant)),
        });
    }
}
