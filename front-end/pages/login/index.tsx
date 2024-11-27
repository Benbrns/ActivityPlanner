import Head from "next/head";
import UserLoginForm from "@/components/users/UserLoginForm";
import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <main>
                <UserLoginForm />
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

export default Login;
