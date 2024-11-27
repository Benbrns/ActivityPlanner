import { Participant } from '../domain/model/participant';
import participantDb from '../domain/data-access/participant.db';

const getAllParticipants = async (): Promise<Participant[]> => participantDb.getAllParticipants();

const getParticipantById = async (id: number): Promise<Participant> => {
    const participant = await participantDb.getParticipantById(id);

    if (!Participant) {
        throw new Error('Participant does not exist.');
    }
    return participant;
};

const getParticipantByEmail = async (email: string): Promise<Participant> => {
    const participant = await participantDb.getParticipantByEmail(email);

    if (!Participant) {
        throw new Error('Participant does not exist.');
    }
    return participant;
};

const participantService = {
    getAllParticipants,
    getParticipantById,
    getParticipantByEmail,
};

export default participantService;
