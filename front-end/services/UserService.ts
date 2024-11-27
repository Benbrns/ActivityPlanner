import { User } from "@/types";

const getAllUsers = () => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser") || "null") as string;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getUserById = (userId: string) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getUserByEmail = (email: string) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const userLogin = (user: User) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    // const storedItem = sessionStorage.getItem("LoggedInUser");
    // const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    userLogin,
};

export default UserService;
