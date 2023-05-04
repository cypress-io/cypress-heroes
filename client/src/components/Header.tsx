import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import { useModal } from '../hooks/modal.hook';
import { Button } from './Button';
import LoginForm from './LoginForm';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { setModal } = useModal();
  const { user, logout } = useAuth();
  return (
    <header className="text-gray-500">
      <div className="flex justify-between max-w-6xl">
        <div>
          <Link to="/">
            <img src="/images/cyheroes-logo.svg" alt="Cypress Heroes Logo" />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-8">
            {user && user.isAdmin && (
              <li>
                <Link to="/heroes/new">
                  <Button color="primary">Create New Hero</Button>
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <Button color="outline" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button
                  color="outline"
                  onClick={() => {
                    setModal(<LoginForm onLogin={() => setModal(undefined)} />);
                  }}
                >
                  Login
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
