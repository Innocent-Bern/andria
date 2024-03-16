//const backend_uri = "https://andria-backend-lnrz2crrda-uc.a.run.app/api";
const backend_uri = "http://localhost:8080/api";

export async function GET_USER(token, user) {
    const res = await fetch(`${backend_uri}/get_user/`, {
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
