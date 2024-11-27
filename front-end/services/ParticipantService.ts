const getParticipantByEmail = async (email: string) => {
    const storedItem = sessionStorage.getItem("LoggedInUser");
    const token = storedItem ? JSON.parse(storedItem).token : "";

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/participant/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const ParticipantService = {
    getParticipantByEmail,
};

export default ParticipantService;
