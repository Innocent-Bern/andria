export async function SIGNUP(email, password) {
  const res = await fetch('http://localhost:8080/api/signup', {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  // Add user to local storage
  const user_id = data.user_id;
  const token = data.token;
  localStorage.setItem("User", JSON.stringify(user_id));
  localStorage.setItem("token", JSON.stringify(token));

  // handle errors

  return user_id;
}

export async function LOGIN(email, password) {
  const res = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  
  // Add user to local storage
  const user_id = data.user_id;
  const token = data.token;
  localStorage.setItem("User", JSON.stringify(user_id));
  localStorage.setItem("token", JSON.stringify(token));

  // handle errors
  return user_id;
}