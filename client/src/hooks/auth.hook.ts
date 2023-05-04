import { useCallback, useContext, useEffect, useState } from 'react';
import { CyHeroesContext } from '../components/CyHeroesProvider';
import { User } from '../models';

interface AuthResult {
  access_token?: string;
  user?: User;
  expiresAt: number;
}

const authResultKey = 'auth_result';
const baseUrl = import.meta.env.VITE_API_URL;

export function useAuth() {
  const context = useContext(CyHeroesContext);
  const [authError, setAuthError] = useState<string>();

  useEffect(() => {
    const authResult = getAuthResult();
    if (isSessionValid(authResult)) {
      context.setUser(authResult.user);
    }
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
        setAuthResult(authResult);
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
    const authResult = getAuthResult();
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

function getAuthResult() {
  const authResult = JSON.parse(
    localStorage.getItem(authResultKey) || `{"expiresAt": 0}`
  ) as AuthResult;
  return authResult;
}

function setAuthResult(authResult: AuthResult) {
  localStorage.setItem(authResultKey, JSON.stringify(authResult));
}
