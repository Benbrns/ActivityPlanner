import { Location } from '../../../domain/model/location';

test('Given an valid location object when: location is created then: location is created', () => {
    // Given

    // When
    const createNewLocation = new Location({
        name: 'Tennis Lummen',
        locality: 'Hasselt',
        street: 'Street',
        streetNumber: 30,
        postalCode: 3560,
        capacity: 10,
    });

    //Then
    expect(createNewLocation.name).toContain('Tennis Lummen');
    expect(createNewLocation.locality).toContain('Hasselt');
    expect(createNewLocation.street).toContain('Street');
    expect(createNewLocation.streetNumber).toStrictEqual(30);
    expect(createNewLocation.postalCode).toStrictEqual(3560);
    expect(createNewLocation.capacity).toStrictEqual(10);
});

test('given: a empty name when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: '',
            locality: 'Hasselt',
            street: 'Street',
            streetNumber: 30,
            postalCode: 3560,
            capacity: 10,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('Name cannot be empty');
});

test('given: a empty locality when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: 'Tennis Lummen',
            locality: '',
            street: 'Street',
            streetNumber: 30,
            postalCode: 3560,
            capacity: 10,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('Locality cannot be empty');
});

test('given: a empty street when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: 'Tennis Lummen',
            locality: 'Hasselt',
            street: '',
            streetNumber: 30,
            postalCode: 3560,
            capacity: 10,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('Street cannot be empty');
});

test('given: a invalid streetNumber when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: 'Tennis Lummen',
            locality: 'Hasselt',
            street: 'Street',
            streetNumber: -1,
            postalCode: 3560,
            capacity: 10,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('StreetNumber cannot be empty or be smaller then 0');
});

test('given: a invalid postalCode when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: 'Tennis Lummen',
            locality: 'Hasselt',
            street: 'Street',
            streetNumber: 30,
            postalCode: -1,
            capacity: 10,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('PostalCode cannot be empty or be smaller then 0');
});

test('given: a invalid capacity when: location is created then: then error is thrown', () => {
    // given

    // when
    const createNewLocation = () => {
        new Location({
            name: 'Tennis Lummen',
            locality: 'Hasselt',
            street: 'Street',
            streetNumber: 30,
            postalCode: 3560,
            capacity: -1,
        });
    };

    // Then
    expect(createNewLocation).toThrowError('Capacity cannot be empty or be smaller then 0');
});
