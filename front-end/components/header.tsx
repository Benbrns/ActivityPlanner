import { link } from "fs";
import Link from "next/link";
import router from "next/router";
import { useState, useEffect } from "react";
import Language from "./language";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<String | null>(null);
    const [loggedInUserRole, setLoggedInUserRole] = useState<String | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("LoggedInUser");
        if (storedUser) {
            const userObj = JSON.parse(storedUser);
            setLoggedInUser(userObj.fullname);
            setLoggedInUserRole(userObj.role);
            console.log(loggedInUserRole);
        }
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("LoggedInUser");
        setLoggedInUser(null);
        router.push("/");
    };

    return (
        <header className="bg-gray-800 p-2 text-white text-center">
            <h1 className="text-xl pb-2">Activity Planner</h1>
            <nav className="flex">
                <div className="flex gap-3">
                    <Link href="/" className="hover:text-gray-500">
                        Home
                    </Link>
                    {loggedInUserRole === "admin" && (
                        <Link href="/users" className="hover:text-gray-500">
                            Users
                        </Link>
                    )}
                    {loggedInUserRole && (
                        <Link href="/activities" className="hover:text-gray-500">
                            Activities
                        </Link>
                    )}
                    {loggedInUserRole === "guest" && (
                        <Link href={"/myActivities"} className="hover:text-gray-500">
                            MyActivities
                        </Link>
                    )}
                    {!loggedInUser && (
                        <Link href="/login" className="hover:text-gray-500">
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <a href="#" onClick={handleClick} className="hover:text-gray-500">
                            Logout
                        </a>
                    )}
                </div>
                {loggedInUser && <div className="ml-auto">Welcome, {loggedInUser}</div>}
                <Language />
            </nav>
        </header>
    );
};

export default Header;
