import { useCallback, useContext, useEffect, useState } from 'react';
import { CyHeroesContext } from '../components/CyHeroesProvider';
import { User } from '../models';
import { API_URL } from '../utils/constants';

interface AuthResult {
  access_token?: string;
  user?: User;
  expiresAt: number;
}

const authResultKey = 'auth_result';
const baseUrl = API_URL

export function useAuth() {
  const context = useContext(CyHeroesContext);
  const [authError, setAuthError] = useState<string>();

  useEffect(() => {
    const authResult = getAuthResultFromLocalStorage();
    if (isSessionValid(authResult)) {
      context.setUser(authResult.user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      setAuthError(undefined);
      try {
        const response = await fetch(`${baseUrl}/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        if (response.status === 401) {
          setAuthError('Invalid email or password');
          return;
        }
        const authResult = (await response.json()) as AuthResult;
        saveAuthResultToLocalStorage(authResult);
        context.setUser(authResult.user);
      } catch {
        setAuthError('Unknown error');
      }
    },
    [context]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(authResultKey);
    context.setUser(undefined);
  }, [context]);

  const getAccessToken = () => {
    const authResult = getAuthResultFromLocalStorage();
    return authResult.access_token;
  }

  return {
    user: context.user,
    error: authError,
    login,
    logout,
    getAccessToken
  };
}

function isSessionValid(authResult: AuthResult) {
  const expiration = authResult.expiresAt * 1000; // covert to ms
  if (expiration) {
    const isExpired = Date.now() > expiration;
    if (isExpired) {
      return false;
    }
    return true;
  }
  return false;
}

function getAuthResultFromLocalStorage() {
  const authResult = JSON.parse(
    localStorage.getItem(authResultKey) || `{"expiresAt": 0}`
  ) as AuthResult;
  return authResult;
}

function saveAuthResultToLocalStorage(authResult: AuthResult) {
  localStorage.setItem(authResultKey, JSON.stringify(authResult));
}
