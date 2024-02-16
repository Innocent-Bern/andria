const backend_uri = "http://localhost:8080/api";

let token;
let user;
if (typeof window !== "undefined") {
    token = JSON.parse(localStorage.getItem("token"));
    user = JSON.parse(localStorage.getItem("user"));
}

export async function DELETE_IMAGE(image_name) {
    // Handles users deleting an image
    const res = await fetch(`${backend_uri}/delete_image`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ image_name })
    });
    const data = await res.json();
    return data;
}

export async function ADD_BOOK(formData) {
    // Handles users adding a new book
    const res = await fetch(`${backend_uri}/add_new_book`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    const data = await res.json();
    return data;
}

export async function UPDATE_BOOK_OWNERS(formData) {
    // Handles users adding a new book
    const res = await fetch(`${backend_uri}/add_new_copy`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    const data = await res.json();
    return data;
}
