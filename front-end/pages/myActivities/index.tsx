import Head from "next/head";
import MyActivityOverviewTable from "@/components/myActivities/MyActivitiesOverviewTable";
import ActivityService from "@/services/ActivityService";
import Header from "@/components/header";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const MyActivities: React.FC = () => {
    const { t } = useTranslation();
    const getActivitiesByParticipant = async () => {
        const storedUser = sessionStorage.getItem("LoggedInUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            const response = await ActivityService.getActivitiesByParticipantByEmail(userObj.email);
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        "You are not authorized to view this page. Please login first."
                    );
                } else {
                    throw new Error(response.statusText);
                }
            } else {
                const activities = await response.json();
                return { activities };
            }
        } else {
            throw new Error("You are not authorized to view this page. Please login first.");
        }
    };

    const { data, isLoading, error } = useSWR("myActivities", getActivitiesByParticipant);

    useInterval(() => {
        if (!error) {
            mutate("myActivities", getActivitiesByParticipant());
        }
    }, 5000);

    return (
        <>
            <Head>
                <title>MyActivities</title>
            </Head>
            <Header />
            <main className=" mx-auto max-w-screen-lg p-4 pt-10 flex flex-col items-center justify-center">
                <h1 className="mt-4 text-xl font-extrabold">My Activities</h1>
                <>
                    {error && <div className="text-red-500 text-2xl">{error.message}</div>}
                    {isLoading && <p>Loading...</p>}
                    {data && <MyActivityOverviewTable activities={data.activities} />}
                </>
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

export default MyActivities;
