import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios/AxiosConfig';

export async function Login(email: string, password: string) {
  const rp = await api.post('/api/authenticate/login', {
    username: email,
    password: password,
  });

  return rp.data;
}

export async function Logout() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const rp = await api.post('/api/authenticate/logout', {
    requestToken : refreshToken,
  });

  return rp;
}

export async function FetchForgotPassword(email: string) {
  const rp = await api.get('/api/authenticate/forgot-password/' + email);

  return rp.data.data;
}

export async function ConfirmPasscodeFetch(
  code: string,
  resetPassToken: string,
): Promise<string> {
  const rp = await api.post(
    '/api/authenticate/validate-code/' + resetPassToken,
    {
      code: code,
    },
  );

  return rp.data.data;
}

export async function ResetPassword(
  resetPassToken: string,
  newPassword: string,
) {
  const rp = await api.put(
    '/api/authenticate/change-password',
    {
      newPassword: newPassword,
      token: resetPassToken,
    },
  );

  return rp.data.data;
}

export async function Register(
  email: string,
  password: string
): Promise<string> {
  const rp = await api.post('/api/authenticate/register', {
    email: email,
    password: password,
  });
  

  return rp.data;
}
