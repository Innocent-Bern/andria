const backend_uri = "http://localhost:8080/api";

let token;
let  user;
if (typeof window !== "undefined")
{
    token = JSON.parse(localStorage.getItem("token"));
    user = JSON.parse(localStorage.getItem("user"));
}

export async function GET_USER(user_id) {
    const res = await fetch(`${backend_uri}/get_user/${user_id}`, {
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;
}