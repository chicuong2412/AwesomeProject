import axios from 'axios';

export async function Login(email: string, password: string) {
  const rp = await axios({
    method: 'POST',
    url: 'https://0f92-103-249-22-9.ngrok-free.app/api/authenticate/login',
    data: {
      username: email,
      password: password,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      origin: 'https://localhost:8180',
    },
  });

  return rp;
}

export async function FetchForgotPassword(email: string) {
  const rp = await axios({
    method: 'GET',
    url: 'forgot-password/' + email,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (rp.status !== 200) {
    throw new Error(rp.data.detail);
  }
  return rp.data.data;
}
