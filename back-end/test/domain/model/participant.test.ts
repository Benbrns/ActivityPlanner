import { Participant } from '../../../domain/model/participant';

test('Given an valid participant object when: participant is created then: participant is created', () => {
    // Given

    // When
    const createParticipant = new Participant({
        name: 'Ben Branders',
        email: 'benbranders@ucll.be',
    });

    //Then
    expect(createParticipant.name).toContain('Ben Branders');
    expect(createParticipant.email).toContain('benbranders@ucll.be');
});

test('given: a empty name when: participant is created then: then error is thrown', () => {
    // given

    // when
    const createParticipant = () => {
        new Participant({
            name: '',
            email: 'benbranders@ucll.be',
        });
    };

    // Then
    expect(createParticipant).toThrowError('Name cannot be empty');
});

test('given: a empty email when: participant is created then: then error is thrown', () => {
    // given

    // when
    const createParticipant = () => {
        new Participant({
            name: 'Ben Branders',
            email: '',
        });
    };

    // Then
    expect(createParticipant).toThrowError('Email cannot be empty or is typed wrong');
});

test('given: a invalid email when: participant is created then: then error is thrown', () => {
    // given

    // when
    const createParticipant = () => {
        new Participant({
            name: 'Ben Branders',
            email: 'benbrandersucll.be',
        });
    };

    // Then
    expect(createParticipant).toThrowError('Email cannot be empty or is typed wrong');
});
