const backend_uri = "http://localhost:8080/api";

export async function GET_CHAT(user, token) {

    const respsonse = await fetch(`${backend_uri}/get_chat/${user}`, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await respsonse.json();
    return data
}
export async function ADD_MESSAGE(message, receiver, user, token) {
    if (receiver == user) {
        return { same_user_error: "This copy belongs to you" }
    }
    const respsonse = await fetch(`${backend_uri}/add_chat`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ sender_id: user, receiver_id: receiver, message })
    });
    const data = await respsonse.json();
    return data
}
