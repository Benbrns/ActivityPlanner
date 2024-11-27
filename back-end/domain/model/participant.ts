import { Participant as ParticipantPrisma } from '@prisma/client';
import { Activity } from './activity';

// Implicit many-to-many

export class Participant {
    readonly name: string;
    readonly email: string;
    readonly id?: number;

    constructor(participant: { name: string; email: string; id?: number }) {
        this.validate(participant);
        this.name = participant.name;
        this.email = participant.email;
        this.id = participant.id;
    }

    validate(participant: { name: string; email: string; activities?: Activity[]; id?: number }) {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!participant.name && !participant.name.trim()) {
            throw new Error('Name cannot be empty');
        }
        // if (!participant.email && !participant.email.trim()) {
        //     throw new Error('Email cannot be empty');
        // }
        if (!expression.test(participant.email)) {
            throw new Error('Email cannot be empty or is typed wrong');
        }
    }

    equals({ name, email, id }): boolean {
        return this.name === name && this.email === email && this.id === id;
    }

    static from({ id, name, email }: ParticipantPrisma) {
        return new Participant({
            id,
            name,
            email,
        });
    }
}
