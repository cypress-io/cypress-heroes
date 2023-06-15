import React from 'react';
import { Hero } from '../models';
import { Avatar } from './Avatar';
import { Button } from './Button';

interface ConfirmHireModalProps extends React.PropsWithChildren {
  hero: Hero;
  onHire: () => void;
  onDismiss: () => void;
}

export const ConfirmHireModal: React.FC<ConfirmHireModalProps> = ({
  hero,
  onHire,
  onDismiss,
}) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Hire Hero?
      </h3>

      <p className="text-sm text-gray-500">Hire this hero for {hero.price}?</p>
      <div className="flex flex-col items-center text-sm text-gray-500">
        <Avatar className="text-center" hero={hero} />
        <h5 className="mb-1 text-xl font-medium text-gray-500">{hero.name}</h5>
      </div>

      <div className="flex gap-2 justify-end">
        <Button color="danger" onClick={onHire}>
          Yes
        </Button>
        <Button color="outline" onClick={onDismiss}>
          No
        </Button>
      </div>
    </div>
  );
};
