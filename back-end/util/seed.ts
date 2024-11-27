import { PrismaClient } from '@prisma/client';
import set from 'date-fns/set';
import userService from '../service/user.service';
import activityService from '../service/activity.service';
import locationService from '../service/location.service';

const prisma = new PrismaClient();

const main = async () => {
    try {
        await prisma.activity.deleteMany();
        await prisma.user.deleteMany();
        await prisma.location.deleteMany();

        await userService.createUser({
            name: 'admin',
            familyName: 'admin',
            email: 'admin@admin.com',
            password: 'admin123',
            role: 'admin',
        });

        await userService.createUser({
            name: 'Ben',
            familyName: 'Branders',
            email: 'benbranders@gmail.com',
            password: 'ben123',
            role: 'user',
        });

        await userService.createUser({
            name: 'Bobby',
            familyName: 'Brown',
            email: 'bobbybrown@gmail.com',
            password: 'bobby123',
            role: 'user',
        });

        await userService.createUser({
            name: 'John',
            familyName: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'john123',
            role: 'guest',
        });

        await userService.createUser({
            name: 'Jane',
            familyName: 'Doe',
            email: 'janedoe@gmail.com',
            password: 'jane123',
            role: 'guest',
        });

        await userService.createUser({
            name: 'Ann',
            familyName: 'Linden',
            email: 'annlinden@gmail.com',
            password: 'ann123',
            role: 'guest',
        });

        await userService.createUser({
            name: 'Tom',
            familyName: 'Bexs',
            email: 'tombexs@gmail.com',
            password: 'tom123',
            role: 'guest',
        });

        await userService.createUser({
            name: 'Jan',
            familyName: 'Schrijvers',
            email: 'janschrijvers@gmail.com',
            password: 'jan123',
            role: 'guest',
        });

        await locationService.createLocation({
            name: 'Action Park',
            locality: 'Hasselt',
            street: 'Langendaal',
            streetNumber: 12,
            postalCode: 3500,
            capacity: 20,
        });

        await locationService.createLocation({
            name: 'Tennis Lummen',
            locality: 'Lummen',
            street: 'Langendaal',
            streetNumber: 39,
            postalCode: 3560,
            capacity: 4,
        });

        await activityService.createActivity({
            activityName: 'Horse Riding',
            description: 'Description',
            categoryName: 'Outdoor',
            date: set(new Date(), { hours: 13, minutes: 30 }),
            userEmail: 'benbranders@gmail.com',
            locationName: 'Action Park',
        });

        await activityService.createActivity({
            activityName: 'Golf',
            description: 'Description',
            categoryName: 'Outdoor',
            date: set(new Date(), { hours: 13, minutes: 30 }),
            userEmail: 'benbranders@gmail.com',
            locationName: 'Action Park',
        });

        await activityService.createActivity({
            activityName: 'Football',
            description: 'Description',
            categoryName: 'Outdoor',
            date: set(new Date(), { hours: 13, minutes: 30 }),
            userEmail: 'bobbybrown@gmail.com',
            locationName: 'Action Park',
        });

        await activityService.createActivity({
            activityName: 'Tennis',
            description: 'Description',
            categoryName: 'Outdoor',
            date: set(new Date(), { hours: 13, minutes: 30 }),
            userEmail: 'bobbybrown@gmail.com',
            locationName: 'Tennis Lummen',
        });

        await activityService.addParticipantToActivity(1, 1);
        await activityService.addParticipantToActivity(1, 2);
        await activityService.addParticipantToActivity(1, 3);
        await activityService.addParticipantToActivity(1, 4);
        await activityService.addParticipantToActivity(1, 5);

        await activityService.addParticipantToActivity(2, 1);
        await activityService.addParticipantToActivity(2, 2);
        await activityService.addParticipantToActivity(2, 3);
        await activityService.addParticipantToActivity(2, 4);
        await activityService.addParticipantToActivity(2, 5);

        await activityService.addParticipantToActivity(3, 2);
        await activityService.addParticipantToActivity(3, 3);
        await activityService.addParticipantToActivity(3, 4);
        await activityService.addParticipantToActivity(3, 5);

        await activityService.addParticipantToActivity(4, 2);
        await activityService.addParticipantToActivity(4, 3);
        await activityService.addParticipantToActivity(4, 4);
        await activityService.addParticipantToActivity(4, 5);

        console.log('Successfully imported data');
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
