import React from "react";
import { render, screen } from "@testing-library/react";
import UserOverviewTable from "../components/users/UserOverviewTable";

// given
const users = [
    {
        name: "Ben",
        familyName: "Branders",
        email: "benbranders@gmail.com",
        password: "ben123",
        role: "user",
        id: 2,
    },
    {
        name: "Jane",
        familyName: "Doe",
        email: "janedoe@gmail.com",
        password: "jane123",
        role: "user",
        id: 2,
    },
];

let userService: jest.Mock;
userService = jest.fn();

test("given users - when you want to see the overview of the users - then the users are shown", () => {
    // when
    render(<UserOverviewTable users={users} />);

    // then
    expect(screen.getByText("benbranders@gmail.com"));
    expect(screen.getByText("janedoe@gmail.com"));
});
