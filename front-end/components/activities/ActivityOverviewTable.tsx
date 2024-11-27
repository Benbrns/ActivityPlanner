import React, { useEffect, useState } from "react";
import { Activity, Participant } from "@/types";
import ActivityService from "../../services/ActivityService";
import Link from "next/link";
import ParticipantService from "../../services/ParticipantService";
import { useTranslation } from "react-i18next";

type Props = {
    activities: Array<Activity>;
    selectedActivity: (activity: Activity) => void;
};

const ActivityOverviewTable: React.FC<Props> = ({ activities, selectedActivity }: Props) => {
    const formatDateTime = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateTimeString).toLocaleDateString("en-NL", options);
        // 'en-NL' is used for Dutch locale, you can change it based on your requirements
    };
    const [loggidInUserRole, setLoggedInUserRole] = useState<String | null>(null);
    const [capacityError, setCapacityError] = useState("");
    const [participantError, setParticipantError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { t } = useTranslation();

    // adding participant to an activity
    const addParticipant = async (activityId: string) => {
        const storedUser = sessionStorage.getItem("LoggedInUser");
        setCapacityError("");
        setParticipantError("");
        setSuccessMessage("");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);

            const response = await Promise.resolve(ActivityService.getActivityById(activityId));
            const activitiesResponse = response;
            const activity = await activitiesResponse.json();

            for (const participant of activity.participants) {
                if (participant.email === userObj.email) {
                    setParticipantError(`${t("errors.participantError")}`);
                    return;
                }
            }
            if (activity.participants.length === activity.location.capacity) {
                setCapacityError(`${t("errors.capacityError")}`);
                return;
            } else {
                const response = await Promise.resolve(
                    ParticipantService.getParticipantByEmail(userObj.email)
                );
                const participantResponse = response;
                const participant = await participantResponse.json();
                await ActivityService.addParticipantToActivity(activityId, participant.id);
                setSuccessMessage(`${t("errors.successEnroll")}'${activity.activityName}'`);
            }
        }
    };

    const deleteActivity = (id: number) => {
        const confirmDelete = window.confirm(t("activity.deleteActivity"));

        if (confirmDelete) {
            ActivityService.deleteActivity(id);
            alert(t("activity.deleteAlert"));
        }
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem("LoggedInUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setLoggedInUserRole(userObj.role);
            console.log(loggidInUserRole);
        }
    }, []);

    return (
        <>
            {activities && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {t("activity.activityName")}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {t("activity.description")}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {t("activity.categoryName")}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {t("activity.date")}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {t("activity.location")}
                            </th>
                            {loggidInUserRole !== "guest" && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t("activity.edit")}
                                </th>
                            )}
                            {loggidInUserRole !== "guest" && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t("activity.delete")}
                                </th>
                            )}
                            {loggidInUserRole === "guest" && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t("activity.enroll")}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activities.map((activity, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100"
                                onClick={() => selectedActivity(activity)}
                                role="button"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {activity.activityName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {activity.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {activity.categoryName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDateTime(activity.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {activity.location.name}
                                </td>
                                {loggidInUserRole !== "guest" && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            className="underline underline-offset-2 hover:text-green-500"
                                            href={`/activities/edit/${activity.id}`}
                                        >
                                            {t("activity.edit")}
                                        </Link>
                                    </td>
                                )}
                                {loggidInUserRole !== "guest" && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            className="underline underline-offset-2 hover:text-red-500"
                                            onClick={() => deleteActivity(activity.id)}
                                            href={{}}
                                        >
                                            {t("activity.delete")}
                                        </Link>
                                    </td>
                                )}
                                {loggidInUserRole === "guest" && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            className="underline underline-offset-2 hover:text-green-500"
                                            onClick={() => addParticipant(activity.id.toString())}
                                            href={{}}
                                        >
                                            {t("activity.enroll")}
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {loggidInUserRole !== "guest" && (
                <div className="mt-10">
                    <Link
                        className="p-4 bg-blue-400 rounded-lg shadow-md hover:bg-blue-500"
                        href={"/activities/add"}
                    >
                        {t("activity.addActivity")}
                    </Link>
                </div>
            )}
            {capacityError && <div className="text-red-500 text-2xl mt-2">{capacityError}</div>}
            {participantError && (
                <div className="text-red-500 text-2xl mt-2">{participantError}</div>
            )}
            {successMessage && <div className="text-green-500 text-2xl mt-2">{successMessage}</div>}
        </>
    );
};

export default ActivityOverviewTable;
