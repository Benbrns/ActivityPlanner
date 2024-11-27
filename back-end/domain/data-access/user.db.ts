import database from '../../util/database';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => {
    const userPrisma = await database.user.findMany();
    return userPrisma.map((userPrisma) => User.from(userPrisma));
};

const getUserById = async (id: number): Promise<User> => {
    const userPrisma = await database.user.findUnique({
        where: {
            id: id,
        },
    });
    return userPrisma ? User.from(userPrisma) : null;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const userPrisma = await database.user.findFirst({
        where: {
            email: email,
        },
    });
    return userPrisma ? User.from(userPrisma) : null;
};

const createUser = async ({ name, familyName, email, password, role }: User): Promise<User> => {
    const userPrisma = await database.user.create({
        data: {
            name: name,
            familyName: familyName,
            email: email,
            password: password,
            role: role,
        },
    });
    const createdUser = User.from(userPrisma);
    return createdUser;
};

const removeUser = async (id: number): Promise<User> => {
    const userPrisma = await database.user.delete({
        where: {
            id: id,
        },
    });
    const removedUser = User.from(userPrisma);
    return removedUser;
};

const updateUser = async (existingUser: User, updatedUser: User): Promise<User> => {
    const userPrisma = await database.user.update({
        where: { id: existingUser.id },
        data: {
            ...existingUser,
            ...updatedUser,
        },
    });
    return User.from(userPrisma);
};

const userDb = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    removeUser,
    updateUser,
};

export default userDb;
