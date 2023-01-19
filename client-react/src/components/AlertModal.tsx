import React from 'react';
import { useModal } from '../hooks/modal.hook';
import { Button } from './Button';

interface AlertModalProps extends React.PropsWithChildren {
  onDismiss: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  children,
  onDismiss,
}) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <div className="flex flex-col items-center text-sm text-gray-500">
        <h5 className="mb-1 text-xl font-medium text-gray-500">{children}</h5>
      </div>

      <div className="flex gap-2 justify-end">
        <Button color="outline" onClick={onDismiss}>
          Ok
        </Button>
      </div>
    </div>
  );
};
