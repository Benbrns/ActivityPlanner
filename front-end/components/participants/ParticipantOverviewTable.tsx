import { Activity } from "@/types";
import React from "react";

type Props = {
    activity: Activity;
};

const ParticipantOverviewTable: React.FC<Props> = ({ activity }: Props) => {
    return (
        <>
            {activity.participants && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activity.participants.map((participant, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{participant.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ParticipantOverviewTable;
