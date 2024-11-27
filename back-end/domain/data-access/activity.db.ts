import database from '../../util/database';
import { Activity } from '../model/activity';
import { User } from '../model/user';

const getAllActivities = async (): Promise<Activity[]> => {
    try {
        const activityPrisma = await database.activity.findMany({
            include: {
                user: true,
                location: true,
                participants: true,
            },
        });

        return activityPrisma.map((activityPrisma) => Activity.from(activityPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getActivities = async (user: User): Promise<Activity[]> => {
    try {
        const activityPrisma = await database.activity.findMany({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: {
                user: user,
            },
        });

        return activityPrisma.map((activityPrisma) => Activity.from(activityPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getActivityById = async (id: number): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.findUnique({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: {
                id: id,
            },
        });

        return activityPrisma ? Activity.from(activityPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getActivitiesByParticipantByEmail = async (participantEmail: string): Promise<Activity[]> => {
    try {
        const activityPrisma = await database.activity.findMany({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: {
                participants: { some: { email: participantEmail } },
            },
        });

        return activityPrisma.map((activityPrisma) => Activity.from(activityPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const createActivity = async (newActivity: Activity): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.create({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            data: {
                activityName: newActivity.activityName,
                description: newActivity.description,
                finished: newActivity.finished,
                categoryName: newActivity.categoryName,
                date: newActivity.date,
                user: { connect: { id: newActivity.user.id } },
                location: { connect: { id: newActivity.location.id } },
            },
        });

        return Activity.from(activityPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const removeActivity = async (id: number): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.delete({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: {
                id: id,
            },
        });

        return Activity.from(activityPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const updateActivity = async (
    existingActivity: Activity,
    updatedActivity: Activity
): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.update({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: { id: existingActivity.id },
            data: {
                activityName: updatedActivity.activityName,
                description: updatedActivity.description,
                categoryName: updatedActivity.categoryName,
                date: updatedActivity.date,
                locationId: updatedActivity.location.id,
            },
        });

        return Activity.from(activityPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const addParticipantToActivity = async (
    activityId: number,
    participantId: number
): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.update({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: { id: activityId },
            data: {
                participants: { connect: { id: participantId } },
            },
        });

        return Activity.from(activityPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const removeParticipantFromActivity = async (
    activityId: number,
    participantId: number
): Promise<Activity> => {
    try {
        const activityPrisma = await database.activity.update({
            include: {
                user: true,
                location: true,
                participants: true,
            },
            where: { id: activityId },
            data: {
                participants: { disconnect: { id: participantId } },
            },
        });

        return Activity.from(activityPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const activityDb = {
    getAllActivities,
    getActivities,
    getActivityById,
    getActivitiesByParticipantByEmail,
    createActivity,
    removeActivity,
    updateActivity,
    addParticipantToActivity,
    removeParticipantFromActivity,
};

export default activityDb;
