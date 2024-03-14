//const backend_uri = "https://andria-backend-lnrz2crrda-uc.a.run.app/api";
const backend_uri = "http://localhost:8080/api";

export async function SIGNUP(email, password) {
  const res = await fetch(`${backend_uri}/signup`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  return data;
}

export async function LOGIN(email, password) {
  const res = await fetch(`${backend_uri}/login`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  return data;
}
