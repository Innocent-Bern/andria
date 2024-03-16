//const backend_uri = "https://andria-backend-lnrz2crrda-uc.a.run.app/api";
const backend_uri = "http://localhost:8080/api";

export async function GET_BOOKS_DB(token) {
    // fetches available books from the database
    const res = await fetch(`${backend_uri}/available_books`, {
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

export async function GET_BOOK_DB(title, author, token) {
    // Search for a specific book
    const res = await fetch(`${backend_uri}/find_book`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, author })
    });

    const data = await res.json();
    return data;
}

export async function GETUSERSBOOKS(token) {
    // return books belonging to the current user
}

export async function GET_BOOK_GOOGLE(title, author, token) {
    // fetches available books from google books api
    const res = await fetch(`${backend_uri}/get_books_google`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, author })
    });
    const data = await res.json();
    return data;
}
