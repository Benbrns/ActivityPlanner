import database from '../../util/database';
import { Location } from '../model/location';

const getAllLocations = async (): Promise<Location[]> => {
    const locationPrisma = await database.location.findMany();
    return locationPrisma.map((locationPrisma) => Location.from(locationPrisma));
};

const getLocationByName = async (name: string): Promise<Location> => {
    const locationPrisma = await database.location.findFirst({
        where: {
            name: name,
        },
    });
    return locationPrisma ? Location.from(locationPrisma) : null;
};

const getLocationById = async (id: number): Promise<Location> => {
    const locationPrisma = await database.location.findUnique({
        where: {
            id: id,
        },
    });
    return locationPrisma ? Location.from(locationPrisma) : null;
};

const createdLocation = async ({
    name,
    locality,
    street,
    streetNumber,
    postalCode,
    capacity,
}: Location): Promise<Location> => {
    const locationPrisma = await database.location.create({
        data: {
            name: name,
            locality: locality,
            street: street,
            streetNumber: streetNumber,
            postalCode: postalCode,
            capacity: capacity,
        },
    });
    const createdLocation = Location.from(locationPrisma);
    return createdLocation;
};

const updateLocation = async (
    existingLocation: Location,
    updatedLocation: Location
): Promise<Location> => {
    const locationPrisma = await database.location.update({
        where: { id: existingLocation.id },
        data: {
            name: updatedLocation.name,
            locality: updatedLocation.locality,
            street: updatedLocation.street,
            streetNumber: updatedLocation.streetNumber,
            postalCode: updatedLocation.postalCode,
            capacity: updatedLocation.capacity,
        },
    });
    return Location.from(locationPrisma);
};

const removeLocation = async (id: number): Promise<Location> => {
    const locationPrisma = await database.location.delete({
        where: {
            id: id,
        },
    });
    const removedLocation = Location.from(locationPrisma);
    return removedLocation;
};

const locationDb = {
    getAllLocations,
    getLocationByName,
    getLocationById,
    createdLocation,
    updateLocation,
    removeLocation,
};

export default locationDb;
