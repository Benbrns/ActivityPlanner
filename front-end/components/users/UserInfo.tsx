import React from "react";
import { User } from "@/types";

type Props = {
    user: User | null;
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
    return (
        <>
            {user && (
                <div>
                    <p>{user.name}</p>
                    <p>{user.familyName}</p>
                    <p>{user.email}</p>
                    <p>{user.password}</p>
                    <p>{user.id}</p>
                </div>
            )}
        </>
    );
};

export default UserInfo;
