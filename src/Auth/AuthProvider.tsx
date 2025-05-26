import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {IAuth} from '../interfaces/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../services/AuthServices';

const AuthContext = createContext<IAuth>({
  loading: false,
  accessToken: null,
  refreshToken: null,
  setTokens: (_newAccessToken: string, _newRefreshToken: string) => {},
  clearTokens: () => {},
});

export default function AuthProvider({children}: {children: ReactNode}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTokens = async () => {
      setLoading(true);
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      setAccessToken(storedAccessToken);

      setRefreshToken(storedRefreshToken);
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
    await Logout();
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
