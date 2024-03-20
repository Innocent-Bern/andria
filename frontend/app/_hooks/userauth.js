const backend_uri = process.env.NEXT_PUBLIC_BACKEND;

export async function signup(email, password) {
  const res = await fetch(`${backend_uri}/api/signup`, {
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

export async function login(email, password) {
  const res = await fetch(`${backend_uri}/api/login`, {
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
