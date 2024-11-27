import locationDb from '../../domain/data-access/location.db';
import { Location } from '../../domain/model/location';
import locationService from '../../service/location.service';

const locatoinOne = new Location({
    name: 'Tennis Lu',
    locality: 'Hasselt',
    street: 'Nieuwlaan',
    streetNumber: 2,
    postalCode: 3560,
    capacity: 10,
    id: 1,
});
const locatoinTwo = new Location({
    name: 'Football Lu',
    locality: 'Diest',
    street: 'Stationstraat',
    streetNumber: 32,
    postalCode: 3294,
    capacity: 100,
    id: 2,
});

let mockLocationDbGetAllLocations: jest.Mock;
let mockLocationDbGetLocationByName: jest.Mock;
let mockLocationDbGetLocationById: jest.Mock;
let mockLocationDbCreateLocation: jest.Mock;
let mockLocationDbUpdateLocation: jest.Mock;
let mockLocationDbRemoveLocation: jest.Mock;

beforeEach(() => {
    mockLocationDbGetAllLocations = jest.fn();
    mockLocationDbGetLocationByName = jest.fn();
    mockLocationDbGetLocationById = jest.fn();
    mockLocationDbCreateLocation = jest.fn();
    mockLocationDbUpdateLocation = jest.fn();
    mockLocationDbRemoveLocation = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a populated database when: asked for all locations then: all locations are returned', async () => {
    // given
    const locationList = [locatoinOne, locatoinTwo];
    locationDb.getAllLocations = mockLocationDbGetAllLocations.mockResolvedValue(locationList);

    // when
    const result = await locationService.getAllLocations();

    // then
    expect(mockLocationDbGetAllLocations).toHaveBeenCalledTimes(1);
    expect(result).toEqual(locationList);
});

test('given: an valid location name when: locaton is asked then: the location is returned', async () => {
    // given
    locationDb.getLocationByName = mockLocationDbGetLocationByName.mockResolvedValue(locatoinOne);

    // when
    const result = await locationService.getLocationByName(locatoinOne.name);

    // then
    expect(mockLocationDbGetLocationByName).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationByName).toHaveBeenCalledWith(locatoinOne.name);
    expect(result).toEqual(locatoinOne);
});

test('given: a valid location id when: location is asked then: the location is returned', async () => {
    // given
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(locatoinOne);

    // when
    const result = await locationService.getLocationById(locatoinOne.id);

    // then
    expect(mockLocationDbGetLocationById).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledWith(locatoinOne.id);
    expect(result).toEqual(locatoinOne);
});

test('given: a invalid location id when: location is asked then: an error is thrown', async () => {
    // given
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(null);

    // when then
    expect(locationService.getLocationById(locatoinOne.id)).rejects.toThrowError(
        `Location with id: ${locatoinOne.id} does not exist.`
    );
});

test('given: a valid location when: location is created then: the new location is returned', async () => {
    // given
    const newLocation = new Location({
        name: 'Paintball Hasselt',
        locality: 'Hasselt',
        street: 'Diestselaan',
        streetNumber: 54,
        postalCode: 3560,
        capacity: 24,
        id: 3,
    });
    locationDb.createdLocation = mockLocationDbCreateLocation.mockResolvedValue(newLocation);

    // when
    const result = await locationService.createLocation({
        name: 'Paintball Hasselt',
        locality: 'Hasselt',
        street: 'Diestselaan',
        streetNumber: 54,
        postalCode: 3560,
        capacity: 24,
        id: 3,
    });

    // then
    expect(mockLocationDbCreateLocation).toHaveBeenCalledTimes(1);
    expect(mockLocationDbCreateLocation).toHaveBeenCalledWith({
        name: 'Paintball Hasselt',
        locality: 'Hasselt',
        street: 'Diestselaan',
        streetNumber: 54,
        postalCode: 3560,
        capacity: 24,
    });
    expect(result).toEqual(newLocation);
});

test('given: a valid location id and valid parameter when: updateting an location then: the updated location is returned', async () => {
    // given
    const updatedLocationInput = { name: 'Tennis Lummen' };
    const updatedLocation = new Location({
        name: 'Tennis Lu',
        locality: 'Hasselt',
        street: 'Nieuwlaan',
        streetNumber: 2,
        postalCode: 3560,
        capacity: 10,
        id: 1,
    });
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(locatoinOne);
    locationDb.updateLocation = mockLocationDbUpdateLocation.mockResolvedValue(updatedLocation);

    // when
    const result = await locationService.updateLocation(locatoinOne.id, updatedLocationInput);

    // then
    expect(mockLocationDbUpdateLocation).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledWith(locatoinOne.id);
    expect(result).toEqual(updatedLocation);
});

test('given: a invalid location id and valid parameter when: updateting an location then: an error is thrown', async () => {
    // given
    const updatedLocationInput = { name: 'Tennis Lummen' };
    const updatedLocation = new Location({
        name: 'Tennis Lu',
        locality: 'Hasselt',
        street: 'Nieuwlaan',
        streetNumber: 2,
        postalCode: 3560,
        capacity: 10,
        id: 1,
    });
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(null);
    locationDb.updateLocation = mockLocationDbUpdateLocation.mockResolvedValue(updatedLocation);

    // when then
    expect(
        locationService.updateLocation(locatoinOne.id, updatedLocationInput)
    ).rejects.toThrowError('Location does not exitst.');
    expect(mockLocationDbGetLocationById).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledWith(locatoinOne.id);
});

test('given: a valid location id when: location is removed then: the location is deleted', async () => {
    // given
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(locatoinOne);
    locationDb.removeLocation = mockLocationDbRemoveLocation.mockResolvedValue(locatoinOne);

    // when
    const result = await locationService.removeLocation(locatoinOne.id);

    // then
    expect(mockLocationDbRemoveLocation).toHaveBeenCalledTimes(1);
    expect(mockLocationDbRemoveLocation).toHaveBeenCalledWith(locatoinOne.id);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledWith(locatoinOne.id);
    expect(result).toEqual(locatoinOne);
});

test('given: a invalid location id when: location is removed then: an error is thrown', async () => {
    // given
    locationDb.getLocationById = mockLocationDbGetLocationById.mockResolvedValue(null);
    locationDb.removeLocation = mockLocationDbRemoveLocation.mockResolvedValue(locatoinOne);

    // when then
    expect(locationService.removeLocation(locatoinOne.id)).rejects.toThrowError(
        'Location does not exitst.'
    );
    expect(mockLocationDbGetLocationById).toHaveBeenCalledTimes(1);
    expect(mockLocationDbGetLocationById).toHaveBeenCalledWith(locatoinOne.id);
});
