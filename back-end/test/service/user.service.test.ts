import { User } from '../../domain/model/user';
import userService from '../../service/user.service';
import userDb from '../../domain/data-access/user.db';

const userOne = new User({
    name: 'ben',
    familyName: 'branders',
    email: 'benbranders@gmail.com',
    password: 'itsasecret',
    role: 'admin',
});
const userTwo = new User({
    name: 'john',
    familyName: 'doe',
    email: 'johndoe@gmail.com',
    password: 'itsasecret',
    role: 'user',
});

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockUserDbDeleteUser: jest.Mock;
let mockUserDbUpdateUser: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockUserDbDeleteUser = jest.fn();
    mockUserDbUpdateUser = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid user database when: all users is asked then: all users are returned', async () => {
    // given
    let userList = [userOne, userTwo];
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(userList);

    // when
    const result = await userService.getAllUsers();

    // then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userList);
});

test('given a valid id, when user id is asked, then user is returned', async () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(userOne);

    // when
    const result = await userService.getUserById(userOne.id);

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(userOne.id);
    expect(result).toEqual(userOne);
});

test('given a invalid id, when user id is asked, an error is returned', async () => {
    // given
    userDb.getUserById = mockUserDbGetUserById;

    // when then
    expect(userService.getUserById(userOne.id)).rejects.toThrowError('User id does not exist');
});

test('given a valid email, when user email is asked, then user is returned', async () => {
    // given
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(userOne);

    // when
    const result = await userService.getUserByEmail(userOne.email);
    // then
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userOne.email);
    expect(result).toEqual(userOne);
});

test('given a invalid email, when user email is asked, then user is returned', async () => {
    // given
    userDb.getUserByEmail = mockUserDbGetUserByEmail;

    // when then
    expect(userService.getUserByEmail(userOne.email)).rejects.toThrowError('Email does not exist');
});

test('given: a valid user when: user is created then: the now user is returend', async () => {
    // given
    const createdUser = new User({
        name: 'Jane',
        familyName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'itsASecret',
        role: 'user',
        id: 3,
    });
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(null);
    userDb.createUser = mockUserDbCreateUser.mockResolvedValue(createdUser);

    // when
    const result = await userService.createUser({
        name: 'Jane',
        familyName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'itsASecret',
        role: 'user',
        id: 3,
    });

    // then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith('janedoe@gmail.com');
    expect(result).toEqual(createdUser);
});

test('given: a invalid userEmail when: user is created then: an error is thrown', async () => {
    // given
    const createdUser = new User({
        name: 'Jane',
        familyName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'itsASecret',
        role: 'user',
        id: 3,
    });
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(userOne);
    userDb.createUser = mockUserDbCreateUser.mockResolvedValue(createdUser);

    // when then
    expect(
        userService.createUser({
            name: 'Jane',
            familyName: 'Doe',
            email: userOne.email,
            password: 'itsASecret',
            role: 'user',
            id: 3,
        })
    ).rejects.toThrowError('Email does already exist');
    expect(mockUserDbGetUserByEmail).toBeCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userOne.email);
});

test('given: a valid user id when: user is deleted then: the deleted user is returned', async () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(userOne);
    userDb.removeUser = mockUserDbDeleteUser.mockResolvedValue(userOne);

    // when
    const result = await userService.deleteUser(userOne.id);

    // then
    expect(mockUserDbDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(userOne.id);
    expect(result).toEqual(userOne);
});

test('given: a invalid user id when: user is deleted then: an error is thrown', async () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(null);
    userDb.removeUser = mockUserDbDeleteUser.mockResolvedValue(userOne);

    // when then
    expect(userService.deleteUser(userOne.id)).rejects.toThrowError('User id does not exist');
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith(userOne.id);
});

test('given: an valid user email and valid values when: updating a user then: the updated user is returned', async () => {
    // given
    const updatedUserInput = { name: 'bennn' };
    const updatedUserOne = new User({
        name: 'ben',
        familyName: 'branders',
        email: 'benbranders@gmail.com',
        password: 'itsasecret',
        role: 'admin',
    });
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(userOne);
    userDb.updateUser = mockUserDbUpdateUser.mockResolvedValue(updatedUserOne);

    // when
    const result = await userService.updateUser(userOne.email, updatedUserInput);

    // then
    expect(mockUserDbUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userOne.email);
    expect(result).toEqual(updatedUserOne);
});

test('given: an invalid user email and valid values when: updating a user then: an error is thrown', async () => {
    // given
    const updatedUserInput = { name: 'bennn' };
    const updatedUserOne = new User({
        name: 'bennn',
        familyName: 'branders',
        email: 'benbranders@gmail.com',
        password: 'itsasecret',
        role: 'admin',
    });
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockResolvedValue(null);
    userDb.updateUser = mockUserDbUpdateUser.mockResolvedValue(updatedUserOne);

    // when then
    expect(userService.updateUser(userOne.email, updatedUserInput)).rejects.toThrowError(
        'User does not exist'
    );
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith(userOne.email);
});
