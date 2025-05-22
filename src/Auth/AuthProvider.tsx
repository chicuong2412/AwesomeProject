import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {IAuth} from '../interfaces/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext<IAuth>({
  loading: false,
  accessToken: null,
  refreshToken: null,
  setTokens: (newAccessToken: string, newRefreshToken: string) => {},
  clearTokens: () => {},
});

export default function AuthProvider({children}: {children: ReactNode}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTokens = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      if (storedRefreshToken != null) {
        const rp = await axios({
          method: 'POST',
          url: 'https://b30a-2001-ee0-51dd-c300-da1-64e6-16dd-db47.ngrok-free.app/api/authenticate/refresh-token',
          data: {
            storedRefreshToken,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            origin: 'https://localhost:8180',
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (rp.status !== 400) {
          setAccessToken(rp.data.token);
          setRefreshToken(rp.data.refreshToken);

          // await AsyncStorage.setItem(Config, rp.data.token);
          await AsyncStorage.setItem('refreshToken', rp.data.refreshToken);
        }
      }
      setLoading(false);
    };
    loadTokens();
  }, []);

  // Save tokens to storage
  const saveTokens = async (
    newAccessToken: string,
    newRefreshToken: string,
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    await AsyncStorage.setItem('accessToken', newAccessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
  };

  // Remove tokens from storage (logout)
  const clearTokens = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens: saveTokens,
        clearTokens,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext);
  if (!context) {
  }
  return context;
};
