const backend_uri = process.env.NEXT_PUBLIC_BACKEND;

export async function GET_BOOKS_DB(token) {
    // fetches available books from the database
    const res = await fetch(`${backend_uri}/api/available_books`, {
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
    const res = await fetch(`${backend_uri}/api/find_book`, {
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

export async function GET_USER_BOOKS(user_id, token) {
    // returns books belonging to current user
    const res = await fetch(`${backend_uri}/api/get_user_books/${user_id}`, {
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

export async function GET_BOOK_GOOGLE(title, author, token) {
    // fetches available books from google books api
    const res = await fetch(`${backend_uri}/api/get_books_google`, {
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
