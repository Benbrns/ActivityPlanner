import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActivityService from "@/services/ActivityService";
import Head from "next/head";
import Header from "@/components/header";
import { Activity, StatusMessage } from "@/types";
import LocationService from "@/services/LocationService";
import { Location } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const editActivityById = () => {
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [date, setDate] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationDisplayName, setLocationDisplayName] = useState("");
    const [locationNameError, setLocationNameError] = useState("");

    const [dateError, setDateError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const [activity, setActivity] = useState({
        activityName: "",
        description: "",
        categoryName: "",
        date: "",
        locationName: "",
    });

    const { t } = useTranslation();

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

    const router = useRouter();
    const { activityId } = router.query;

    const getActivityById = async () => {
        const [activityResponse] = await Promise.all([
            ActivityService.getActivityById(activityId as string),
        ]);
        const [activityy] = await Promise.all([activityResponse.json()]);
        setLocationDisplayName(activityy.location.name);
        setActivity(activityy);
    };

    useEffect(() => {
        if (activityId) getActivityById();
    });

    const clearErrors = () => {
        setDateError("");
        setLocationNameError("");
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

        if (date && !iso8601Regex.test(date)) {
            setDateError(`${t("errors.dateError")}`);
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let advance = true;
        clearErrors();

        if (!validate()) {
            advance = false;
        }

        if (locationName) {
            const isLocationValid = await getLocationByNameValidation(locationName);
            if (!isLocationValid) {
                advance = false;
            }
        }

        if (!advance) {
            return;
        }

        ActivityService.updateActivity(
            activityId as string,
            activityName,
            description,
            categoryName,
            date,
            locationName
        );

        setStatusMessages([
            {
                message: `${t("errors.successUpdate")}`,
                type: "success",
            },
        ]);

        setTimeout(() => {
            router.push("/activities");
        }, 1000);
    };

    return (
        <>
            <Head>
                <title>Edit Activity</title>
            </Head>
            <Header />
            <main>
                <div className="container mx-auto mt-8 p-8 bg-gray-100 max-w-md rounded-md shadow-md">
                    <h3 className="text-2xl font-bold mb-4">{t("activity.editActivity")}</h3>
                    {statusMessages && (
                        <div text-green-700 p-3 mb-4 rounded-md>
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
                        <label
                            htmlFor="ActivityNameInput"
                            className="block mb-2 text-sm font-medium"
                        >
                            {t("activity.activityName")}
                        </label>
                        <div>
                            <input
                                placeholder={activity.activityName}
                                id="activityName"
                                type="text"
                                value={activityName}
                                onChange={(event) => setActivityName(event.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <label
                            htmlFor="DescriptionInput"
                            className="block mb-2 text-sm font-medium"
                        >
                            {t("activity.description")}
                        </label>
                        <div>
                            <input
                                placeholder={activity.description}
                                id="description"
                                type="text"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <label
                            htmlFor="CategoryNameInput"
                            className="block mb-2 text-sm font-medium"
                        >
                            {t("activity.categoryName")}
                        </label>
                        <div>
                            <input
                                placeholder={activity.categoryName}
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <label htmlFor="DateInput" className="block mb-2 text-sm font-medium">
                            {t("activity.date")}
                        </label>
                        <div>
                            <input
                                placeholder={activity.date}
                                id="date"
                                type="text"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                            {dateError && <div className="text-red-500">{dateError}</div>}
                        </div>
                        <label
                            htmlFor="LocationNameInput"
                            className="block mb-2 text-sm font-medium"
                        >
                            {t("activity.location")}
                        </label>
                        <div>
                            <input
                                placeholder={locationDisplayName}
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
                            {t("activity.updateActivity")}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default editActivityById;
