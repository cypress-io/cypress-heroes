import React from 'react';
import { Button } from './Button';

interface IconButtonProps {
  icon: 'money' | 'like' | 'pencil' | 'trash';
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <Button color="outline" data-cy={icon} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-[24px] w-[24px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <InnerPath type={icon} />
      </svg>
    </Button>
  );
};

function InnerPath({ type }: { type: IconButtonProps['icon'] }) {
  switch (type) {
    case 'money':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    case 'like':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      );
    case 'pencil':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      );
    case 'trash':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      );
  }
}

export default IconButton;
