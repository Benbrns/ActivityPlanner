import { Activity } from "@/types";

const getAllActivities = () => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/activities", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getActivityById = (activityId: string) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/${activityId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const createActivity = (
    activityName: string,
    description: string,
    categoryName: string,
    date: string,
    userEmail: string,
    locationName: string
) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/activities/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            activityName,
            description,
            categoryName,
            date,
            userEmail,
            locationName,
        }),
    });
};

const updateActivity = (
    activityId: string,
    activityName: string,
    description: string,
    categoryName: string,
    date: string,
    locationName: string
) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    console.log("activity service update");
    console.log(activityName);
    console.log(description);
    console.log(categoryName);
    console.log(date);
    console.log(locationName);
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/update/${activityId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activityName, description, categoryName, date, locationName }),
    });
};

const deleteActivity = (id: number) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const addParticipantToActivity = (activityId: string, participantId: string) => {
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(
        process.env.NEXT_PUBLIC_API_URL +
            `/activities/add/${activityId}/participant/${participantId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
const removeParticipantFromActivity = (activityId: string, participantId: string) => {
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(
        process.env.NEXT_PUBLIC_API_URL +
            `/activities/remove/${activityId}/participant/${participantId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const getActivitiesByParticipantByEmail = (participantEmail: string) => {
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/activities/participant/${participantEmail}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const ActivityService = {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    addParticipantToActivity,
    removeParticipantFromActivity,
    getActivitiesByParticipantByEmail,
};

export default ActivityService;
