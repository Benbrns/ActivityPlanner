import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const UserLoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const { t } = useTranslation();

    const clearErrors = () => {
        setEmailError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = false;
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!expression.test(email)) {
            setEmailError(`${t("errors.emailError")}`);
            result = false;
        }
        if (!password || password.trim()) {
            setPasswordError(`${t("errors.passwordError")}`);
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        if (!validate) {
            return;
        }

        const user = { email, password };
        const response = await UserService.userLogin(user);

        if (response.status === 200) {
            setStatusMessages([{ message: `${t("errors.successLogin")}`, type: "success" }]);

            const user = await response.json();

            sessionStorage.setItem(
                "LoggedInUser",
                JSON.stringify({
                    token: user.token,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                })
            );

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            setStatusMessages([{ message: `${t("errors.errorLogin")}`, type: "error" }]);
        }
    };

    return (
        <>
            <div className="container mx-auto mt-8 p-8 bg-gray-100 max-w-md rounded-md shadow-md">
                <h3 className="text-2xl font-bold mb-4">{t("login.login")}</h3>
                {statusMessages && (
                    <div>
                        <ul>
                            {statusMessages.map(({ message, type }, index) => (
                                // <li
                                //     key={index}
                                //     style={{ color: type === "success" ? "green" : "red" }}
                                // >
                                //     {message}{" "}
                                // </li>
                                <li
                                    key={index}
                                    className={classNames({
                                        "text-red-800": type === "error",
                                        "text-green-800": type === "success",
                                    })}
                                >
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="NameInput" className="block mb-2 text-sm font-medium">
                        {t("login.email")}
                    </label>
                    <div>
                        <input
                            id="emailInput"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {emailError && <div className="text-red-500">{emailError}</div>}
                    </div>
                    <label htmlFor="NameInput" className="block mb-2 text-sm font-medium">
                        {t("login.password")}
                    </label>
                    <div>
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {passwordError && <div className="text-red-500">{passwordError}</div>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                    >
                        {t("login.login")}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserLoginForm;
