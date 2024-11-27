import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ActivityOverviewTable from "../components/activities/ActivityOverviewTable";
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

const activitiesWithDeletedObject = [
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
    render(<ActivityOverviewTable activities={activities} />);

    // then
    expect(screen.getByText("Horse Riding"));
    expect(screen.getByText("Golf"));
});

test("given activities - when you want to delete an activity - then the remaining activities are shown", () => {
    // given
    ActivityService.deleteActivity = activityService.mockResolvedValue(activitiesWithDeletedObject);

    // when
    const { rerender } = render(<ActivityOverviewTable activities={activities} />);

    const deleteButtons = screen.queryAllByText("activity.delete");
    if (deleteButtons.length > 0) {
        fireEvent.click(deleteButtons[1]);
    }

    // then
    rerender(<ActivityOverviewTable activities={activitiesWithDeletedObject} />);
    expect(screen.getByText("Horse Riding"));
});
