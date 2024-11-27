import React, { useEffect, useState } from "react";
import { Activity } from "@/types";
import ActivityService from "../../services/ActivityService";
import ParticipantService from "../../services/ParticipantService";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type Props = {
    activities: Array<Activity>;
};

const MyActivityOverviewTable: React.FC<Props> = ({ activities }: Props) => {
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
    const { t } = useTranslation();

    const [loggidInUserRole, setLoggedInUserRole] = useState<String | null>(null);
    const [successDisenroll, setSuccessDisenroll] = useState("");

    const removeParticipant = async (activityId: string) => {
        setSuccessDisenroll("");
        const storedUser = sessionStorage.getItem("LoggedInUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            const response = await Promise.resolve(
                ParticipantService.getParticipantByEmail(userObj.email)
            );
            const participantResponse = response;
            const participant = await participantResponse.json();
            await ActivityService.removeParticipantFromActivity(activityId, participant.id);
            setSuccessDisenroll(`${t("errors.successDisenroll")}`);
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
                            {loggidInUserRole === "guest" && (
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {t("activity.disenroll")}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activities.map((activity, index) => (
                            <tr key={index} className="hover:bg-gray-100">
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
                                {loggidInUserRole === "guest" && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            className="underline underline-offset-2 hover:text-red-500"
                                            onClick={() =>
                                                removeParticipant(activity.id.toString())
                                            }
                                            href={{}}
                                        >
                                            {t("activity.disenroll")}
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {successDisenroll && (
                <div className="text-green-500 text-2xl mt-2">{successDisenroll}</div>
            )}
        </>
    );
};

export default MyActivityOverviewTable;
