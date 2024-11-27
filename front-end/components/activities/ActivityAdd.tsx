import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ActivityService from "@/services/ActivityService";
import UserService from "@/services/UserService";
import LocationService from "@/services/LocationService";
import { useTranslation } from "react-i18next";

const ActivityAdd: React.FC = () => {
    // const [loggedInUserEmail, setLoggedInUserEmail] = useState<String | null>(null);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");

    const { t } = useTranslation();

    useEffect(() => {
        // setLoggedInUser(sessionStorage.getItem("LoggedInUser"));
        const storedUser = sessionStorage.getItem("LoggedInUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setLoggedInUserEmail(userObj.email);
        }
    }, []);

    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [date, setDate] = useState("");
    const [locationName, setLocationName] = useState("");
    const [activityNameError, setActivityNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryNameError, setCategoryNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [locationNameError, setLocationNameError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setActivityNameError("");
        setDescriptionError("");
        setCategoryNameError("");
        setDateError("");
        setLocationNameError("");
        setStatusMessages([]);
    };

    const getLocationByNameValidation = async (locationName: string): Promise<boolean> => {
        try {
            const location = await LocationService.getLocationByName(locationName);
            if (location.status === 200) {
                return true;
            } else {
                setLocationNameError(`${t("errors.locationNameErrorOne")}`);
                return false;
            }
        } catch (error) {
            setLocationNameError(`${t("errors.locationNameErrorTwo")}`);
            return false;
        }
    };

    const validate = (): boolean => {
        let result = true;
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

        if (!activityName || activityName.trim() === "") {
            setActivityNameError(`${t("errors.activityNameError")}`);
            result = false;
        }
        if (!description || description.trim() === "") {
            setDescriptionError(`${t("errors.descriptionError")}`);
            result = false;
        }
        if (!categoryName || categoryName.trim() === "") {
            setCategoryNameError(`${t("errors.CategoryNameError")}`);
            result = false;
        }
        if (!iso8601Regex.test(date)) {
            setDateError(`${t("errors.dateError")}`);
            result = false;
        }
        if (!locationName || locationName.trim() === "") {
            setLocationNameError(`${t("errors.locationNameErrorThree")}`);
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        // const isEmailValid = await getUserByEmailValidation(userEmail);
        const isLocationValid = await getLocationByNameValidation(locationName);

        if (!validate()) {
            return;
        }

        if (!isLocationValid) {
            return;
        }

        ActivityService.createActivity(
            activityName,
            description,
            categoryName,
            date,
            loggedInUserEmail,
            locationName
        );

        setStatusMessages([
            {
                message: `${t("errors.success")}`,
                type: "success",
            },
        ]);

        setTimeout(() => {
            router.push("/activities");
        }, 1000);
    };

    return (
        <>
            <div className="container mx-auto mt-8 p-8 bg-gray-100 max-w-md rounded-md shadow-md">
                <h3 className="text-2xl font-bold mb-4">{t("activity.addActivity")}</h3>
                {statusMessages && (
                    <div className=" text-green-700 p-3 mb-4 rounded-md">
                        <ul>
                            {statusMessages.map(({ message, type }, index) => (
                                <li
                                    key={index}
                                    style={{ color: type === "success" ? "green" : "red" }}
                                >
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="ActivityNameInput" className="block mb-2 text-sm font-medium">
                        {t("activity.activityName")}
                    </label>
                    <div>
                        <input
                            placeholder="Football"
                            id="activityName"
                            type="text"
                            value={activityName}
                            onChange={(event) => setActivityName(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {activityNameError && (
                            <div className="text-red-500">{activityNameError}</div>
                        )}
                    </div>
                    <label htmlFor="DescriptionInput" className="block mb-2 text-sm font-medium">
                        {t("activity.description")}
                    </label>
                    <div>
                        <input
                            placeholder="Afthernoon sport event"
                            id="description"
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {descriptionError && <div className="text-red-500">{descriptionError}</div>}
                    </div>
                    <label htmlFor="CategoryNameInput" className="block mb-2 text-sm font-medium">
                        {t("activity.categoryName")}
                    </label>
                    <div>
                        <input
                            placeholder="Sport"
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {categoryNameError && (
                            <div className="text-red-500">{categoryNameError}</div>
                        )}
                    </div>
                    <label htmlFor="DateInput" className="block mb-2 text-sm font-medium">
                        {t("activity.date")}
                    </label>
                    <div>
                        <input
                            placeholder="2023-10-31T12:30:39.216Z"
                            id="date"
                            type="text"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {dateError && <div className="text-red-500">{dateError}</div>}
                    </div>
                    <label htmlFor="LocationNameInput" className="block mb-2 text-sm font-medium">
                        {t("activity.location")}
                    </label>
                    <div>
                        <input
                            placeholder="Tennis Lummen"
                            id="locationName"
                            type="text"
                            value={locationName}
                            onChange={(event) => setLocationName(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {locationNameError && (
                            <div className="text-red-500">{locationNameError}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                    >
                        {t("activity.addActivity")}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ActivityAdd;
