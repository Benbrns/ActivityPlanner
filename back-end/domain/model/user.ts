import { User as UserPrisma } from '@prisma/client';
import { Role } from '../../types';

export class User {
    readonly name: string;
    readonly familyName: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly id?: number;

    constructor(user: {
        name: string;
        familyName: string;
        email: string;
        password: string;
        role: Role;
        id?: number;
    }) {
        this.validate(user);
        this.name = user.name;
        this.familyName = user.familyName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.id = user.id;
    }
    validate(user: {
        name?: string;
        familyName: string;
        email: string;
        password: string;
        role: Role;
        id?: number;
    }) {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!user.name || !user.name.trim()) {
            throw new Error('Name cannot be empty');
        }
        if (!user.familyName || !user.familyName.trim()) {
            throw new Error('familyName cannot be empty');
        }
        if (!expression.test(user.email)) {
            throw new Error('Email cannot be empty or is typed wrong');
        }
        if (!user.password || !user.password.trim()) {
            throw new Error('Password cannot be empty');
        }
        if (!user.role || !user.role.trim()) {
            throw new Error('Role cannot be empty');
        }
    }

    equals({ name, familyName, email, password, role, id }): boolean {
        return (
            this.name === name &&
            this.familyName === familyName &&
            this.email === email &&
            this.password === password &&
            this.role === role &&
            this.id === id
        );
    }

    static from({ id, name, familyName, email, password, role }: UserPrisma) {
        return new User({
            id,
            name,
            familyName,
            email,
            password,
            role: role as Role,
        });
    }
}
