import React from 'react';
import Header from '../components/Header';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-5xl p-4 mx-auto">
      <Header />
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default Layout;
