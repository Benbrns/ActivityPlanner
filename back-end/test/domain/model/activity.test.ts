import { Activity } from '../../../domain/model/activity';
import { User } from '../../../domain/model/user';
import { Location } from '../../../domain/model/location';
import set from 'date-fns/set';

const setUser = new User({
    name: 'ben',
    familyName: 'branders',
    email: 'benbranders2@gmail.com',
    password: 'itsAsecret',
    role: 'user',
});

const setLocation = new Location({
    name: 'tennis',
    locality: 'hasselt',
    street: 'street',
    streetNumber: 12,
    postalCode: 3560,
    capacity: 10,
});

const setDate = set(new Date(), { hours: 13, minutes: 30 });

test('given: a valid activity when: activity is created then: activity is created', () => {
    // given

    // when
    const createNewActivity = new Activity({
        activityName: 'Football',
        description: 'Finals',
        categoryName: 'Outdoor',
        date: setDate,
        user: setUser,
        location: setLocation,
    });

    // then
    expect(createNewActivity.activityName).toContain('Football');
    expect(createNewActivity.description).toContain('Finals');
    expect(createNewActivity.categoryName).toEqual('Outdoor');
    expect(createNewActivity.date).toEqual(setDate);
    expect(createNewActivity.user).toEqual(setUser);
    expect(createNewActivity.location).toEqual(setLocation);
});

test('given: a empty activityName when: activity is created then: then error is thrown', () => {
    // given

    // when

    // Then
    expect(
        () =>
            new Activity({
                activityName: '',
                description: 'Finals',
                categoryName: 'Outdoor',
                date: setDate,
                user: setUser,
                location: setLocation,
            })
    ).toThrow('activityName cannot be empty');
});

test('given: a empty description when: activity is created then: then error is thrown', () => {
    // given

    // when

    // Then
    expect(
        () =>
            new Activity({
                activityName: 'Football',
                description: '',
                categoryName: 'Outdoor',
                date: setDate,
                user: setUser,
                location: setLocation,
            })
    ).toThrow('description cannot be empty');
});

test('given: a empty categoryName when: activity is created then: then error is thrown', () => {
    // given

    // when

    // Then
    expect(
        () =>
            new Activity({
                activityName: 'Football',
                description: 'Finals',
                categoryName: '',
                date: setDate,
                user: setUser,
                location: setLocation,
            })
    ).toThrow('categoryName cannot be empty');
});

// test('given: a invalid date when: activity is created then: then error is thrown', () => {
//     // given

//     // when

//     // Then
//     expect(
//         () =>
//             new Activity({
//                 activityName: 'Football',
//                 description: 'Finals',
//                 categoryName: 'Outdoor',
//                 date: null,
//                 user: setUser,
//                 location: setLocation,
//             })
//     ).toThrow('date is not in the correct format or is empty');
// });

test('given: a empty user when: activity is created then: then an error is thrown', () => {
    // given

    // when

    // Then
    expect(
        () =>
            new Activity({
                activityName: 'Football',
                description: 'Finals',
                categoryName: 'Outdoor',
                date: setDate,
                user: null,
                location: setLocation,
            })
    ).toThrow('user cannot be empty');
});

test('given: a empty location when: activity is created then: then an error is thrown', () => {
    // given

    // when

    // Then
    expect(
        () =>
            new Activity({
                activityName: 'Football',
                description: 'Finals',
                categoryName: 'Outdoor',
                date: setDate,
                user: setUser,
                location: null,
            })
    ).toThrow('location cannot be empty');
});
