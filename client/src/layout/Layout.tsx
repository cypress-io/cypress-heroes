import React from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import { useModal } from '../hooks/modal.hook';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { modal, setModal } = useModal();
  return (
    <div className="max-w-5xl p-4 mx-auto">
      <Header />
      <div className="mt-8">{children}</div>
      <Modal
        component={modal}
        open={!!modal}
        onClose={() => setModal(undefined)}
      />
    </div>
  );
};

export default Layout;
