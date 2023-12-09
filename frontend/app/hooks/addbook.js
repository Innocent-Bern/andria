let token;
let user;
if (typeof window !== "undefined")
{
    token = JSON.parse(localStorage.getItem("token"));
    user = JSON.parse(localStorage.getItem("user"));
}

const backend_uri = "http://localhost:8080/api";

/**
 * Steps to add book
 * 1. Check if it exist in the database
 * 2. if it does:
 *      Add owner's book details. ie upload users book image, append their id
 * 3. If not sach for books in books api
 * 4. User selects matching book.
 * 5. User uploads image of their book.
 * 6. Save new book to db
 * 7. Redirect user to my books
 */
export async function UPLOAD_IMAGE(formData) {
    const res = await fetch(`${backend_uri}/upload_image`, {
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

export async function ADD_BOOK(book_details) {
    // Handles users adding a new book
    const res = await fetch(`${backend_uri}/add_new_book`, {
	    method: "POST",
        mode: "cors",
	    headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(book_details)
    });
    const data = await res.json();
    return data;
}
