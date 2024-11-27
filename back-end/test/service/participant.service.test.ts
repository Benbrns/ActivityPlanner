import participantDb from '../../domain/data-access/participant.db';
import { Participant } from '../../domain/model/participant';
import participantService from '../../service/participant.service';

const participantOne = new Participant({ name: 'john Doe', email: 'johndoe@gmail.com', id: 1 });

const participantTwo = new Participant({ name: 'jane Doe', email: 'janedoe@gmail.com', id: 2 });

let mockParticipantDbGetAllParticipants: jest.Mock;
let mockParticipantDbGetParticipantById: jest.Mock;
let mockParticipantDbGetparticipantByEmail: jest.Mock;

beforeEach(() => {
    mockParticipantDbGetAllParticipants = jest.fn();
    mockParticipantDbGetParticipantById = jest.fn();
    mockParticipantDbGetparticipantByEmail = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a populated participant data base when: all participants is asked then: all participants are returned', async () => {
    // given
    const participantList = [participantOne, participantTwo];
    participantDb.getAllParticipants =
        mockParticipantDbGetAllParticipants.mockResolvedValue(participantList);

    // when
    const result = await participantService.getAllParticipants();

    // then
    expect(mockParticipantDbGetAllParticipants).toHaveBeenCalledTimes(1);
    expect(result).toEqual(participantList);
});

test('given: an valid participant id when: participant is asked then: the participant is returned', async () => {
    // given
    participantDb.getParticipantById =
        mockParticipantDbGetParticipantById.mockResolvedValue(participantOne);

    // when
    const result = await participantService.getParticipantById(participantOne.id);

    // then
    expect(mockParticipantDbGetParticipantById).toHaveBeenCalledTimes(1);
    expect(mockParticipantDbGetParticipantById).toHaveBeenCalledWith(participantOne.id);
    expect(result).toEqual(participantOne);
});

test('given: an valid participant email when: an particpant is asked by email then: the participant is returned', async () => {
    // given
    participantDb.getParticipantByEmail =
        mockParticipantDbGetparticipantByEmail.mockResolvedValue(participantOne);

    // when
    const result = await participantService.getParticipantByEmail(participantOne.email);

    // then
    expect(mockParticipantDbGetparticipantByEmail).toHaveBeenCalledTimes(1);
    expect(mockParticipantDbGetparticipantByEmail).toHaveBeenCalledWith(participantOne.email);
    expect(result).toEqual(participantOne);
});
