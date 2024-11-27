import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import Head from "next/head";
import Header from "@/components/header";
import { User } from "@/types";
import UserInfo from "@/components/users/UserInfo";

const ReadUserById = () => {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();
    const { userId } = router.query;

    const getUserById = async () => {
        const [userResponse] = await Promise.all([UserService.getUserById(userId as string)]);
        const [userr] = await Promise.all([userResponse.json()]);
        setUser(userr);
    };

    useEffect(() => {
        if (userId) getUserById();
    });

    return (
        <>
            <Head>
                <title>User info</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Info of {user && user.name}</h1>
                {!userId && <p>Loading</p>}
                <section>
                    <UserInfo user={user}></UserInfo>
                </section>
            </main>
        </>
    );
};

export default ReadUserById;
