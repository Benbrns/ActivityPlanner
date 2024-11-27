import Head from "next/head";
import Header from "@/components/header";

const overviewActivity = () => {
    return (
        <>
            <Head>
                <title>overview</title>
            </Head>
            <Header />
            <main>
                <h1>Overview</h1>
            </main>
        </>
    );
};

export default overviewActivity;
