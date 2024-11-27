import { Location } from "@/types";

const getAllLocations = () => {
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/locations", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getLocationByName = (locationName: string) => {
    // const token = JSON.parse(sessionStorage.getItem("LoggedInUser"))?.token;
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/locations/name/${locationName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const LocationService = {
    getAllLocations,
    getLocationByName,
};

export default LocationService;
