const backend_uri = process.env.NEXT_PUBLIC_BACKEND;
export async function DELETE_IMAGE(image_name, token) {
    // Handles users deleting an image
    const res = await fetch(`${backend_uri}/api/delete_image`, {
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

export async function ADD_BOOK(formData, token) {
    // Handles users adding a new book
    const res = await fetch(`${backend_uri}/api/add_new_book`, {
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

export async function UPDATE_BOOK_OWNERS(formData, token) {
    // Handles users adding a new book
    const res = await fetch(`${backend_uri}/api/add_new_copy`, {
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
