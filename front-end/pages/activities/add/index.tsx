import Head from "next/head";
import Header from "@/components/header";
import ActivityAdd from "@/components/activities/ActivityAdd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const AddActivity: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>Add Activity</title>
            </Head>
            <Header />
            <main>
                <ActivityAdd />
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

export default AddActivity;
