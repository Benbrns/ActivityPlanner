import { Location as LocationPrisma } from '@prisma/client';

export class Location {
    readonly name: string;
    readonly locality: string;
    readonly street: string;
    readonly streetNumber: number;
    readonly postalCode: number;
    readonly capacity: number;
    readonly id?: number;

    constructor(location: {
        name: string;
        locality: string;
        street: string;
        streetNumber: number;
        postalCode: number;
        capacity: number;
        id?: number;
    }) {
        this.validate(location);
        this.name = location.name;
        this.locality = location.locality;
        this.street = location.street;
        this.streetNumber = location.streetNumber;
        this.postalCode = location.postalCode;
        this.capacity = location.capacity;
        this.id = location.id;
    }
    validate(location: {
        name: string;
        locality: string;
        street: string;
        streetNumber: number;
        postalCode: number;
        capacity: number;
        id?: number;
    }) {
        if (!location.name && !location.name.trim()) {
            throw new Error('Name cannot be empty');
        }
        if (!location.locality && !location.locality.trim()) {
            throw new Error('Locality cannot be empty');
        }
        if (!location.street && !location.street.trim()) {
            throw new Error('Street cannot be empty');
        }
        if (!location.streetNumber || location.streetNumber < 0) {
            throw new Error('StreetNumber cannot be empty or be smaller then 0');
        }
        if (!location.postalCode || location.postalCode < 0) {
            throw new Error('PostalCode cannot be empty or be smaller then 0');
        }
        if (!location.capacity || location.capacity < 0) {
            throw new Error('Capacity cannot be empty or be smaller then 0');
        }
    }
    equals({ name, locality, street, streetNumber, postalCode, capacity, id }): boolean {
        return (
            this.name === name &&
            this.locality === locality &&
            this.street === street &&
            this.streetNumber === streetNumber &&
            this.postalCode === postalCode &&
            this.capacity === capacity &&
            this.id === id
        );
    }
    static from({
        id,
        name,
        locality,
        street,
        streetNumber,
        postalCode,
        capacity,
    }: LocationPrisma) {
        return new Location({
            id,
            name,
            locality,
            street,
            streetNumber,
            postalCode,
            capacity,
        });
    }
}
