import Head from "next/head";
import ActivityOverviewTable from "@/components/activities/ActivityOverviewTable";
import ActivityService from "@/services/ActivityService";
import Header from "@/components/header";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Activity } from "@/types";
import ParticipantOverviewTable from "@/components/participants/ParticipantOverviewTable";

const Activities: React.FC = () => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [loggidInUserRole, setLoggedInUserRole] = useState<String | null>(null);

    const { t } = useTranslation();

    const getActivities = async () => {
        const response = await Promise.all([ActivityService.getAllActivities()]);
        const [activitiesResponse] = response;

        if (!activitiesResponse.ok) {
            if (activitiesResponse.status === 401) {
                throw new Error("You are not authorized to view this page. Please login first.");
            } else {
                throw new Error(activitiesResponse.statusText);
            }
        } else {
            const activities = await activitiesResponse.json();
            return { activities };
        }
    };

    const { data, isLoading, error } = useSWR("activities", getActivities);

    useInterval(() => {
        if (!error) {
            mutate("activities", getActivities());
        }
    }, 5000);

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
            <Head>
                <title>Activities</title>
            </Head>
            <Header />
            <main className=" mx-auto max-w-screen-lg p-4 pt-10 flex flex-col items-center justify-center">
                <h1 className="mt-4 text-xl font-extrabold">Activities</h1>
                <>
                    {error && <div className="text-red-500 text-2xl">{error.message}</div>}
                    {isLoading && <p>Loading...</p>}
                    {data && (
                        <ActivityOverviewTable
                            activities={data.activities}
                            selectedActivity={setSelectedActivity}
                        />
                    )}
                </>
                {selectedActivity && loggidInUserRole !== "guest" && (
                    <section className="mt-10">
                        <h2 className="font-bold">
                            All participants for '{selectedActivity.activityName}'
                        </h2>
                        {selectedActivity.participants && (
                            <ParticipantOverviewTable activity={selectedActivity} />
                        )}
                    </section>
                )}
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

export default Activities;
