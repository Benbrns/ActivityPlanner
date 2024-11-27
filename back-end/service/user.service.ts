import { User } from '../domain/model/user';
import userDb from '../domain/data-access/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import participantDb from '../domain/data-access/participant.db';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) {
        throw new Error('User id does not exist');
    }

    return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail(email);
    if (!user) {
        throw new Error('Email does not exist');
    }

    return user;
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }

    return {
        token: generateJwtToken({ email, role: user.role }),
        email,
        fullname: `${user.name} ${user.familyName}`,
        role: `${user.role}`,
    };
};

const createUser = async ({
    name,
    familyName,
    email,
    password,
    role,
}: UserInput): Promise<User> => {
    const user = await userDb.getUserByEmail(email);
    if (user) {
        throw new Error('Email does already exist');
    }
    if (role === 'guest') {
        const fullname = name + ' ' + familyName;
        await participantDb.createParticipant(fullname, email);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createNewUser = new User({ name, familyName, email, password: hashedPassword, role });

    return userDb.createUser(createNewUser);
};

const deleteUser = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) {
        throw new Error('User id does not exist');
    }

    return userDb.removeUser(id);
};

const updateUser = async (
    userEmail: string,
    { name, familyName, email, password, role }: UserInput
): Promise<User> => {
    const existingUser = await userDb.getUserByEmail(userEmail);
    if (!existingUser) {
        throw new Error('User does not exist');
    }

    const updatedUser = new User({
        name: name || existingUser.name,
        familyName: familyName || existingUser.familyName,
        email: email || existingUser.email,
        password: password || existingUser.password,
        role: role || existingUser.role,
    });

    return userDb.updateUser(existingUser, updatedUser);
};

const userService = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    authenticate,
    createUser,
    deleteUser,
    updateUser,
};
export default userService;
