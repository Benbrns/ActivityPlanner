import Head from "next/head";
import Header from "@/components/header";

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Activity Planner" />
                <meta name="viewport" content="width=device, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="flex flex-col items-center justify-center">
                <h1 className="mt-4 text-xl font-extrabold">Welcome to the homepage!</h1>
                <div className="max-w-2xl mx-auto pt-20">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Password</th>
                                <th className="py-2 px-4">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4">admin@admin.com</td>
                                <td className="py-2 px-4">admin123</td>
                                <td className="py-2 px-4">Admin</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">benbranders@gmail.com</td>
                                <td className="py-2 px-4">ben123</td>
                                <td className="py-2 px-4">User</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">bobbybrown@gmail.com</td>
                                <td className="py-2 px-4">bobby123</td>
                                <td className="py-2 px-4">User</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">johndoe@gmail.com</td>
                                <td className="py-2 px-4">john123</td>
                                <td className="py-2 px-4">Guest</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4">janedoe@gmail.com</td>
                                <td className="py-2 px-4">jane123</td>
                                <td className="py-2 px-4">Guest</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pt-5">
                    <h2 className="font-extrabold">Valid date:</h2>
                    <dl>
                        <li>2024-01-06T12:30:15.558Z</li>
                    </dl>
                    <h2 className="font-extrabold pt-2">Valid locations:</h2>
                    <dl>
                        <li>Action Park</li>
                        <li>Tennis Lummen</li>
                    </dl>
                </div>
            </main>
        </>
    );
};

export default Home;
