import Head from "next/head";
import UsersOverviewTable from "@/components/users/UserOverviewTable";
import UserService from "@/services/UserService";
import Header from "@/components/header";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";

const Users: React.FC = () => {
    const getUsers = async () => {
        const response = await UserService.getAllUsers();

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("You are not authorized to view this page. Please login first.");
            } else {
                throw new Error(response.statusText);
            }
        } else {
            const users = await response.json();
            return { users };
        }
    };

    const { data, isLoading, error } = useSWR("users", getUsers);

    useInterval(() => {
        if (!error) {
            mutate("users", getUsers());
        }
    }, 5000);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className=" mx-auto max-w-screen-lg p-4 pt-10 flex flex-col items-center justify-center">
                <h1 className="mt-4 text-xl font-extrabold">Users</h1>
                <>
                    {error && <div className="text-red-500 text-2xl">{error.message}</div>}
                    {isLoading && <p>Loading...</p>}
                    {data && <UsersOverviewTable users={data.users} />}
                </>
            </main>
        </>
    );
};

export default Users;
