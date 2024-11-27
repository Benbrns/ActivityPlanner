import { Activity } from '../domain/model/activity';
import activityDb from '../domain/data-access/activity.db';
import userDb from '../domain/data-access/user.db';
import { ActivityInput } from '../types';
import { UnauthorizedError } from 'express-jwt';
import locationDb from '../domain/data-access/location.db';
import participantDb from '../domain/data-access/participant.db';

const getActivities = async ({ email, role }): Promise<Activity[]> => {
    if (role === 'admin' || role === 'guest') {
        return activityDb.getAllActivities();
    }
    if (role === 'user') {
        const user = await userDb.getUserByEmail(email);
        return activityDb.getActivities(user);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getActivityById = async (id: number): Promise<Activity> => {
    const activity = await activityDb.getActivityById(id);

    if (!activity) {
        throw new Error('Activity does not exist');
    }
    return activity;
};

const getActivitiesByParticipantByEmail = async (participantEmail: string): Promise<Activity[]> => {
    const participant = await participantDb.getParticipantByEmail(participantEmail);

    if (!participant) {
        throw new Error('Participant does not exist');
    }

    return activityDb.getActivitiesByParticipantByEmail(participantEmail);
};

const createActivity = async ({
    activityName,
    description,
    categoryName,
    date,
    userEmail,
    locationName,
}: ActivityInput): Promise<Activity> => {
    const foundUser = await userDb.getUserByEmail(userEmail);
    const foundLocation = await locationDb.getLocationByName(locationName);
    if (!foundUser) {
        throw new Error(`User with the email: ${userEmail} does not exist`);
    }
    if (!foundLocation) {
        throw new Error(`Location with the name: ${locationName} does not exist`);
    }

    const activity = new Activity({
        activityName,
        description,
        categoryName,
        date,
        user: foundUser,
        location: foundLocation,
    });
    return activityDb.createActivity(activity);
};

const deleteActivity = async (id: number): Promise<Activity> => {
    const activity = await activityDb.getActivityById(id);

    if (!activity) {
        throw new Error('Activity id does not exist');
    }
    return activityDb.removeActivity(id);
};

const updateActivity = async (
    activityId: number,
    { activityName, description, categoryName, date, locationName }: ActivityInput
): Promise<Activity> => {
    const existingActivity = await activityDb.getActivityById(activityId);
    const foundLocation = await locationDb.getLocationByName(locationName);
    if (!existingActivity) {
        throw new Error('Activity does not exist');
    }
    if (!foundLocation && locationName) {
        throw new Error(`Location with the name: ${locationName} does not exist`);
    }

    const updatedActivity = new Activity({
        activityName: activityName || existingActivity.activityName,
        description: description || existingActivity.description,
        categoryName: categoryName || existingActivity.categoryName,
        date: date || existingActivity.date,
        user: existingActivity.user,
        location: foundLocation || existingActivity.location,
    });
    return activityDb.updateActivity(existingActivity, updatedActivity);
};

const addParticipantToActivity = async (
    activityId: number,
    participantId: number
): Promise<Activity> => {
    const activity = await activityDb.getActivityById(activityId);
    const participant = await participantDb.getParticipantById(participantId);

    if (!activity) {
        throw new Error('Activity does not exist!');
    }
    if (!participant) {
        throw new Error('Participant does not exist!');
    }
    if (activity.location.capacity === activity.participants.length) {
        throw new Error('Cannot at participant, total capacity reached');
    }

    return activityDb.addParticipantToActivity(activityId, participantId);
};

const removeParticipantFromActivity = async (
    activityId: number,
    participantId: number
): Promise<Activity> => {
    const activity = await activityDb.getActivityById(activityId);
    const participant = await participantDb.getParticipantById(participantId);

    if (!activity) {
        throw new Error('Activity does not exist!');
    }
    if (!participant) {
        throw new Error('Participant does not exist!');
    }

    return activityDb.removeParticipantFromActivity(activityId, participantId);
};

const activityService = {
    getActivities,
    getActivityById,
    getActivitiesByParticipantByEmail,
    createActivity,
    deleteActivity,
    updateActivity,
    addParticipantToActivity,
    removeParticipantFromActivity,
};
export default activityService;
