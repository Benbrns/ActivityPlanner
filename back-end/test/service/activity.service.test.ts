import { Activity } from '../../domain/model/activity';
import { User } from '../../domain/model/user';
import { Location } from '../../domain/model/location';
import activityService from '../../service/activity.service';
import activityDb from '../../domain/data-access/activity.db';
import { set } from 'date-fns';
import { Participant } from '../../domain/model/participant';
import userDb from '../../domain/data-access/user.db';
import locationDb from '../../domain/data-access/location.db';
import participantDb from '../../domain/data-access/participant.db';

const setDate = set(new Date(), { hours: 13, minutes: 30 });

const userOne = new User({
    name: 'ben',
    familyName: 'branders',
    email: 'benbranders2@gmail.com',
    password: 'itsAsecret',
    role: 'admin',
});
const userTwo = new User({
    name: 'tom',
    familyName: 'holland',
    email: 'tomholland@gmail.com',
    password: 'itsAsecret',
    role: 'user',
});
const location = new Location({
    name: 'tennis',
    locality: 'hasselt',
    street: 'street',
    streetNumber: 12,
    postalCode: 3560,
    capacity: 10,
});
const participantOne = new Participant({
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    id: 1,
});
const participantTwo = new Participant({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 2,
});
const activityOne = new Activity({
    activityName: 'Football',
    description: 'description',
    categoryName: 'Sport',
    date: setDate,
    user: userOne,
    location: location,
    participants: [participantOne],
    id: 1,
});
const activityTwo = new Activity({
    activityName: 'Tennis',
    description: 'description',
    categoryName: 'Sport',
    date: setDate,
    user: userTwo,
    location: location,
    participants: [participantOne, participantTwo],
    id: 2,
});

let mockActivityDbGetActivityById: jest.Mock;
let mockActivityDbGetActivitiesByParticipantByEmail: jest.Mock;
let mockActivityDbCreateActivity: jest.Mock;
let mockActivityDbDeleteActivity: jest.Mock;
let mockActivityDbUpdateActivity: jest.Mock;
let mockActivityDbAddParticipantToActivity: jest.Mock;
let mockActivityDbRemoveParticipantFromActivity: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockLocationDbGetLocationByName: jest.Mock;
let mockParticipantDbGetParticipantById: jest.Mock;

beforeEach(() => {
    mockActivityDbGetActivityById = jest.fn();
    mockActivityDbGetActivitiesByParticipantByEmail = jest.fn();
    mockActivityDbCreateActivity = jest.fn();
    mockActivityDbDeleteActivity = jest.fn();
    mockActivityDbUpdateActivity = jest.fn();
    mockActivityDbAddParticipantToActivity = jest.fn();
    mockActivityDbRemoveParticipantFromActivity = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockLocationDbGetLocationByName = jest.fn();
    mockParticipantDbGetParticipantById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid activity id when: activity id is asked then: activity is returned', async () => {
    // given
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne);

    // when
    const foundActivity = await activityService.getActivityById(1);

    // then
    expect(mockActivityDbGetActivityById).toBeCalledTimes(1);
    expect(foundActivity).toEqual(activityOne);
});

test('given: a invalid activity id when: activity id is asked then: a error is thrown', async () => {
    // given
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(null);

    // when then
    expect(activityService.getActivityById(1)).rejects.toThrowError('Activity does not exist');
});

test('given: a valid participant email when: activities are asked then: all activities that belong to that email are returned', async () => {
    // given
    let activityList = [activityOne, activityTwo];
    activityDb.getActivitiesByParticipantByEmail =
        mockActivityDbGetActivitiesByParticipantByEmail.mockResolvedValue(activityList);

    // when
    const result = await activityService.getActivitiesByParticipantByEmail(participantOne.email);

    // then
    expect(result).toEqual(activityList);
});

test('given: a invalid participant email when: activities are asked then: all activities that belong to that email are returned', () => {
    // given
    activityDb.getActivitiesByParticipantByEmail =
        mockActivityDbGetActivitiesByParticipantByEmail.mockResolvedValue(null);

    // when then
    expect(
        activityService.getActivitiesByParticipantByEmail('johndoe@gmail.com')
    ).rejects.toThrowError('Participant does not exist');
});

test('given: a valid acitivity when: activities is created then: the new activity is returned', async () => {
    // given
    const createdActivity = new Activity({
        activityName: 'Basketball',
        description: 'Hooping',
        categoryName: 'indoor',
        date: setDate,
        user: userTwo,
        location: location,
    });

    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(userTwo);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(location);
    activityDb.createActivity = mockActivityDbCreateActivity.mockResolvedValue(createdActivity);

    // when
    const result = await activityService.createActivity({
        activityName: 'Basketball',
        description: 'Hooping',
        categoryName: 'indoor',
        date: setDate,
        userEmail: userTwo.email,
        locationName: location.name,
    });

    // then
    expect(mockActivityDbCreateActivity).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userTwo.email);
    expect(mockLocationDbGetLocationByName).toHaveBeenCalledWith(location.name);
    expect(result).toEqual(createdActivity);
});

test('given: an invalid userEmial when: activity is created then: an error is thrown', async () => {
    // given
    const createdActivity = new Activity({
        activityName: 'Basketball',
        description: 'Hooping',
        categoryName: 'indoor',
        date: setDate,
        user: userTwo,
        location: location,
    });

    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(null);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(location);
    activityDb.createActivity = mockActivityDbCreateActivity.mockResolvedValue(createdActivity);

    // when then
    expect(
        activityService.createActivity({
            activityName: 'Basketball',
            description: 'Hooping',
            categoryName: 'indoor',
            date: setDate,
            userEmail: userTwo.email,
            locationName: location.name,
        })
    ).rejects.toThrowError(`User with the email: ${userTwo.email} does not exist`);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userTwo.email);
});

test('given: an invalid locationName when: activity is created then: an error is thrown', async () => {
    // given
    const createdActivity = new Activity({
        activityName: 'Basketball',
        description: 'Hooping',
        categoryName: 'indoor',
        date: setDate,
        user: userTwo,
        location: location,
    });

    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(userTwo);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(null);
    activityDb.createActivity = mockActivityDbCreateActivity.mockResolvedValue(createdActivity);

    // when then
    expect(
        activityService.createActivity({
            activityName: 'Basketball',
            description: 'Hooping',
            categoryName: 'indoor',
            date: setDate,
            userEmail: userTwo.email,
            locationName: location.name,
        })
    ).rejects.toThrowError(`Location with the name: ${location.name} does not exist`);
});

test('given: an valid activity id when: deleting an activity then: the activity is deleated', async () => {
    // given
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne);
    activityDb.removeActivity = mockActivityDbDeleteActivity.mockResolvedValue(activityOne);

    // when
    const result = await activityService.deleteActivity(activityOne.id);

    // them
    expect(mockActivityDbDeleteActivity).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
    expect(result).toEqual(activityOne);
});

test('given: an invalid activity id when: deleting an activity then: an error is throwm', async () => {
    // given
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(null);
    activityDb.removeActivity = mockActivityDbDeleteActivity.mockResolvedValue(activityOne);

    // when them
    expect(activityService.deleteActivity(activityOne.id)).rejects.toThrowError(
        'Activity id does not exist'
    );
    expect(mockActivityDbGetActivityById).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
});

test('given: a valid activity id and updated activity name when: updating activity then: the updated activity with a new name is returned', async () => {
    // given
    const updatedActivityInput = {
        activityName: 'Soccer',
    };

    const updatedActivity = new Activity({
        activityName: 'Soccer',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userTwo,
        location: location,
        id: 1,
    });

    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(location);
    activityDb.updateActivity = mockActivityDbUpdateActivity.mockResolvedValue(updatedActivity);

    // when
    const result = await activityService.updateActivity(activityOne.id, updatedActivityInput);

    // then
    expect(mockActivityDbUpdateActivity).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
    expect(result).toEqual(updatedActivity);
});

test('given: a invalid activity id and updated activity name when: updating activity then: the updated activity with a new name is returned', async () => {
    // given
    const updatedActivityInput = {
        activityName: 'Soccer',
    };

    const updatedActivity = new Activity({
        activityName: 'Soccer',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userTwo,
        location: location,
        id: 1,
    });

    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(null);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(location);
    activityDb.updateActivity = mockActivityDbUpdateActivity.mockResolvedValue(updatedActivity);

    // when then
    expect(
        activityService.updateActivity(activityOne.id, updatedActivityInput)
    ).rejects.toThrowError('Activity does not exist');
    expect(mockActivityDbGetActivityById).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
});

test('given: a valid activity id and update the location name with an invalid name when: updating activity then: an error is thrown', async () => {
    // given
    const updatedActivityInput = {
        locationName: 'Sportex',
    };

    const updatedActivity = new Activity({
        activityName: 'Soccer',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userTwo,
        location: location,
        id: 1,
    });

    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne);
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(null);
    activityDb.updateActivity = mockActivityDbUpdateActivity.mockResolvedValue(updatedActivity);

    // when then
    expect(
        activityService.updateActivity(activityOne.id, updatedActivityInput)
    ).rejects.toThrowError(
        `Location with the name: ${updatedActivityInput.locationName} does not exist`
    );
});

test('given: an valid activity id and a valid participant id when: participant is added to the activity then: the participant is added ot the activity', async () => {
    // given
    const updatedActivityOne = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne, participantTwo],
        id: 1,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne);
    participantDb.getParticipantById =
        mockParticipantDbGetParticipantById.mockResolvedValue(participantTwo);
    activityDb.addParticipantToActivity =
        mockActivityDbAddParticipantToActivity.mockResolvedValue(updatedActivityOne);

    // when
    const result = await activityService.addParticipantToActivity(
        activityOne.id,
        participantTwo.id
    );

    // then
    expect(mockActivityDbAddParticipantToActivity).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
    expect(mockParticipantDbGetParticipantById).toHaveBeenCalledWith(participantTwo.id);
    expect(result).toEqual(updatedActivityOne);
});

test('given: an invalid activity id and a valid participant id when: participant is added to the activity then: an error is thrown', async () => {
    // given
    const updatedActivityOne = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne, participantTwo],
        id: 1,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(null);
    participantDb.getParticipantById =
        mockParticipantDbGetParticipantById.mockResolvedValue(participantTwo);
    activityDb.addParticipantToActivity =
        mockActivityDbAddParticipantToActivity.mockResolvedValue(updatedActivityOne);

    // when then
    expect(
        activityService.addParticipantToActivity(activityOne.id, participantTwo.id)
    ).rejects.toThrowError('Activity does not exist!');
    expect(mockActivityDbGetActivityById).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
});

test('given: an valid activity id and a invalid participant id when: participant is added to the activity then: an error is thrown', async () => {
    // given
    const updatedActivityOne = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne, participantTwo],
        id: 1,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityOne.id);
    participantDb.getParticipantById = mockParticipantDbGetParticipantById.mockResolvedValue(null);
    activityDb.addParticipantToActivity =
        mockActivityDbAddParticipantToActivity.mockResolvedValue(updatedActivityOne);

    // when then
    expect(
        activityService.addParticipantToActivity(activityOne.id, participantTwo.id)
    ).rejects.toThrowError('Participant does not exist!');
});

test('given: an valid activity id and a valid participant id when: participant is removed from the activity then: the participant is removed from the activity', async () => {
    // given
    const updatedActivityTwo = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne],
        id: 2,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityTwo);
    participantDb.getParticipantById =
        mockParticipantDbGetParticipantById.mockResolvedValue(participantTwo);
    activityDb.removeParticipantFromActivity =
        mockActivityDbRemoveParticipantFromActivity.mockResolvedValue(updatedActivityTwo);

    // when
    const result = await activityService.removeParticipantFromActivity(
        activityOne.id,
        participantTwo.id
    );

    // then
    expect(mockActivityDbRemoveParticipantFromActivity).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
    expect(mockParticipantDbGetParticipantById).toHaveBeenCalledWith(participantTwo.id);
    expect(result).toEqual(updatedActivityTwo);
});

test('given: an invalid activity id and a valid participant id when: participant is removed from the activity then: the participant is removed from the activity', async () => {
    // given
    const updatedActivityTwo = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne],
        id: 2,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(null);
    participantDb.getParticipantById =
        mockParticipantDbGetParticipantById.mockResolvedValue(participantTwo);
    activityDb.removeParticipantFromActivity =
        mockActivityDbRemoveParticipantFromActivity.mockResolvedValue(updatedActivityTwo);

    // when then
    expect(
        activityService.addParticipantToActivity(activityOne.id, participantTwo.id)
    ).rejects.toThrowError('Activity does not exist!');
    expect(mockActivityDbGetActivityById).toHaveBeenCalledTimes(1);
    expect(mockActivityDbGetActivityById).toHaveBeenCalledWith(activityOne.id);
});

test('given: an valid activity id and a invalid participant id when: participant is removed from the activity then: the participant is removed from the activity', async () => {
    // given
    const updatedActivityTwo = new Activity({
        activityName: 'Football',
        description: 'description',
        categoryName: 'Sport',
        date: setDate,
        user: userOne,
        location: location,
        participants: [participantOne],
        id: 2,
    });
    activityDb.getActivityById = mockActivityDbGetActivityById.mockResolvedValue(activityTwo);
    participantDb.getParticipantById = mockParticipantDbGetParticipantById.mockResolvedValue(null);
    activityDb.removeParticipantFromActivity =
        mockActivityDbRemoveParticipantFromActivity.mockResolvedValue(updatedActivityTwo);

    // when then
    expect(
        activityService.addParticipantToActivity(activityOne.id, participantTwo.id)
    ).rejects.toThrowError('Participant does not exist!');
});
