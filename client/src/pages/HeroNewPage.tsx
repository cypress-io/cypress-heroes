import React from 'react';
import { useNavigate } from 'react-router';
import HeroForm from '../components/HeroForm';
import { useHeroes } from '../hooks/heroes.hook';
import { usePowers } from '../hooks/powers.hook';
import { HeroEditModel } from '../models';

interface HeroNewPageProps {}

const HeroNewPage: React.FC<HeroNewPageProps> = () => {
  const { getPowers } = usePowers();
  const { data: powers } = getPowers();
  const { createHero } = useHeroes();
  const nav = useNavigate();

  if (!powers) {
    return <div>Loading...</div>;
  }

  const handleCreateHero = (hero: HeroEditModel, avatar?: File) => {
    createHero.mutateAsync({ hero, avatar }).then(() => {
      nav('/');
    });
  };

  return (
    <div className="flex flex-col w-full rounded-lg border shadow-md bg-gray-50 mt-8 relative">
      <div className="px-8 py-4">
        <HeroForm powers={powers} onSave={handleCreateHero} />
      </div>
    </div>
  );
};

export default HeroNewPage;
