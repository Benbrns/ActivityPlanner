import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MyActivityOverviewTable from "../components/myActivities/MyActivitiesOverviewTable";
import ActivityService from "../services/ActivityService";

const activities = [
    {
        activityName: "Horse Riding",
        description: "Description",
        finished: false,
        categoryName: "Outdoor",
        date: "2023-12-17T12:30:25.582Z",
        user: {
            name: "Ben",
            familyName: "Branders",
            email: "benbranders@gmail.com",
            password: "ben123",
            role: "user",
            id: 2,
        },
        location: {
            name: "Action Park",
            locality: "Hasselt",
            street: "Langendaal",
            streetNumber: 12,
            postalCode: 3500,
            capacity: 20,
            id: 1,
        },
        participants: [],
        id: 1,
    },
    {
        activityName: "Golf",
        description: "Description",
        finished: false,
        categoryName: "Outdoor",
        date: "2023-12-17T12:30:25.588Z",
        user: {
            name: "Ben",
            familyName: "Branders",
            email: "benbranders@gmail.com",
            password: "ben123",
            role: "user",
            id: 2,
        },
        location: {
            name: "Action Park",
            locality: "Hasselt",
            street: "Langendaal",
            streetNumber: 12,
            postalCode: 3500,
            capacity: 20,
            id: 1,
        },
        participants: [],
        id: 2,
    },
];

const activitiesWhereEnrolledIn = [
    {
        activityName: "Horse Riding",
        description: "Description",
        finished: false,
        categoryName: "Outdoor",
        date: "2023-12-17T12:30:25.582Z",
        user: {
            name: "Ben",
            familyName: "Branders",
            email: "benbranders@gmail.com",
            password: "ben123",
            role: "user",
            id: 2,
        },
        location: {
            name: "Action Park",
            locality: "Hasselt",
            street: "Langendaal",
            streetNumber: 12,
            postalCode: 3500,
            capacity: 20,
            id: 1,
        },
        participants: [],
        id: 1,
    },
];

let activityService: jest.Mock;
activityService = jest.fn();

test("given activities - when you want to see the overview of the activities - then the activities are shown", () => {
    // when
    render(<MyActivityOverviewTable activities={activities} />);

    // then
    expect(screen.getByText("Horse Riding"));
    expect(screen.getByText("Golf"));
});

test("given activities - when you want to delete an activity - then the remaining activities are shown", () => {
    // given
    ActivityService.removeParticipantFromActivity =
        activityService.mockResolvedValue(activitiesWhereEnrolledIn);

    // when
    const { rerender } = render(<MyActivityOverviewTable activities={activities} />);

    const disenrollButtons = screen.queryAllByText("Disenroll");
    if (disenrollButtons.length > 0) {
        fireEvent.click(disenrollButtons[1]);
    }

    // then
    rerender(<MyActivityOverviewTable activities={activitiesWhereEnrolledIn} />);
    expect(screen.getByText("Horse Riding"));
});
