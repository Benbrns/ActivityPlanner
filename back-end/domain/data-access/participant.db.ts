import database from '../../util/database';
import { Participant } from '../model/participant';

const getAllParticipants = async (): Promise<Participant[]> => {
    const participantPrisma = await database.participant.findMany({
        include: {
            activities: true,
        },
    });
    return participantPrisma.map((participantPrisma) => Participant.from(participantPrisma));
};

const getParticipantById = async (id: number): Promise<Participant> => {
    const participantPrisma = await database.participant.findFirst({
        include: {
            activities: true,
        },
        where: {
            id: id,
        },
    });
    return participantPrisma ? Participant.from(participantPrisma) : null;
};

const getParticipantByEmail = async (email: string): Promise<Participant> => {
    const participantPrisma = await database.participant.findFirst({
        where: {
            email: email,
        },
    });
    return participantPrisma ? Participant.from(participantPrisma) : null;
};

const createParticipant = async (name: string, email: string): Promise<Participant> => {
    const participantPrisma = await database.participant.create({
        include: {
            activities: true,
        },
        data: {
            name: name,
            email: email,
        },
    });
    return Participant.from(participantPrisma);
};

const participantDb = {
    getAllParticipants,
    getParticipantById,
    getParticipantByEmail,
    createParticipant,
};

export default participantDb;
