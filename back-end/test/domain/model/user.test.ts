import { User } from '../../../domain/model/user';

test('given: a valid user when: user is created then: user is created', () => {
    // given

    // when
    const createNewUser = new User({
        name: 'ben',
        familyName: 'branders',
        email: 'benbranders2@gmail.com',
        password: 'itsAsecret',
        role: 'user',
    });

    // then
    expect(createNewUser.name).toContain('ben');
    expect(createNewUser.familyName).toContain('branders');
    expect(createNewUser.email).toEqual('benbranders2@gmail.com');
    expect(createNewUser.password).toEqual('itsAsecret');
    expect(createNewUser.role).toEqual('user');
});
test('given: an empty name when: user is created then: error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: '',
            familyName: 'branders',
            email: 'benbranders2@gmail.com',
            password: 'itsAsecret',
            role: 'user',
        });

    // then
    expect(createNewUser).toThrowError('Name cannot be empty');
});

test('given: an empty familyName when: user is created then: error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: 'Ben',
            familyName: '',
            email: 'benbranders2@gmail.com',
            password: 'itsAsecret',
            role: 'user',
        });

    // then
    expect(createNewUser).toThrowError('familyName cannot be empty');
});

test('given: an invalid email when: user is created then: error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: 'ben',
            familyName: 'branders',
            email: 'benbranders2gmail.com',
            password: 'itsAsecret',
            role: 'user',
        });

    // then
    expect(createNewUser).toThrowError('Email cannot be empty or is typed wrong');
});

test('given: an empty email when: user is created then: error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: 'ben',
            familyName: 'branders',
            email: '',
            password: 'itsAsecret',
            role: 'user',
        });

    // then
    expect(createNewUser).toThrowError('Email cannot be empty or is typed wrong');
});

test('given: an empty password when: user is created then: error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: 'ben',
            familyName: 'branders',
            email: 'benbranders2@gmail.com',
            password: '',
            role: 'user',
        });

    // then
    expect(createNewUser).toThrowError('Password cannot be empty');
});

test('given: an empty role when: user is created then: an error is thrown', () => {
    // given

    // when
    const createNewUser = () =>
        new User({
            name: 'ben',
            familyName: 'branders',
            email: 'benbranders2@gmail.com',
            password: 'itsAsecret',
            role: null,
        });

    // then
    expect(createNewUser).toThrowError('Role cannot be empty');
});
