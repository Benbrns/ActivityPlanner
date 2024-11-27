import { Location } from '../domain/model/location';
import { LocationInput } from '../types';
import locationDb from '../domain/data-access/location.db';

const getAllLocations = async (): Promise<Location[]> => locationDb.getAllLocations();

const getLocationByName = async (name: string): Promise<Location> => {
    const location = await locationDb.getLocationByName(name);

    if (!location) {
        throw new Error(`Location with the name: ${name} does not exist`);
    }
    return location;
};

const getLocationById = async (id: number): Promise<Location> => {
    const location = await locationDb.getLocationById(id);

    if (!location) {
        throw new Error(`Location with id: ${id} does not exist.`);
    }
    return location;
};

const createLocation = async ({
    name,
    locality,
    street,
    streetNumber,
    postalCode,
    capacity,
}: LocationInput): Promise<Location> => {
    const createNewLocation = new Location({
        name,
        locality,
        street,
        streetNumber,
        postalCode,
        capacity,
    });

    return locationDb.createdLocation(createNewLocation);
};

const updateLocation = async (
    locationId: number,
    { name, locality, street, streetNumber, postalCode, capacity }: LocationInput
): Promise<Location> => {
    const existingLocation = await locationDb.getLocationById(locationId);

    if (!existingLocation) {
        throw new Error('Location does not exitst.');
    }

    const updatedLocation = new Location({
        name: name || existingLocation.name,
        locality: locality || existingLocation.locality,
        street: street || existingLocation.street,
        streetNumber: streetNumber || existingLocation.streetNumber,
        postalCode: postalCode || existingLocation.postalCode,
        capacity: capacity || existingLocation.capacity,
    });
    return locationDb.updateLocation(existingLocation, updatedLocation);
};

const removeLocation = async (id: number): Promise<Location> => {
    const location = await locationDb.getLocationById(id);

    if (!location) {
        throw new Error('Location does not exitst.');
    }

    return locationDb.removeLocation(id);
};

const locationService = {
    getAllLocations,
    getLocationByName,
    getLocationById,
    createLocation,
    updateLocation,
    removeLocation,
};

export default locationService;
