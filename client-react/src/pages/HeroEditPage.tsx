import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Avatar } from '../components/Avatar';
import { ConfirmDeleteHeroModal } from '../components/ConfirmDeleteHeroModal';
import { useHeroes } from '../hooks/heroes.hook';
import { Hero, HeroEditModel } from '../models';
import { useModal } from '../hooks/modal.hook';
import { usePowers } from '../hooks/powers.hook';
import HeroForm from '../components/HeroForm';

interface HeroEditPageProps {}

const HeroEditPage: React.FC<HeroEditPageProps> = () => {
  const { getHero, deleteHero, updateHero } = useHeroes();
  const { getPowers } = usePowers();
  const { id } = useParams();
  const { data: hero } = getHero(Number(id));
  const { data: powers } = getPowers();
  const { setModal } = useModal();
  const nav = useNavigate();

  const handleDeleteHero = (hero: Hero) => {
    setModal(
      <ConfirmDeleteHeroModal
        hero={hero}
        onDelete={() => {
          deleteHero(hero);
          setModal(undefined);
        }}
        onDismiss={() => setModal(undefined)}
      />
    );
  };

  const handleUpdateHero = (hero: HeroEditModel, avatarFile?: File) => {
    updateHero(hero, avatarFile).then(() => {
      nav('/');
    });
  };

  if (!hero || !powers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full rounded-lg border shadow-md bg-gray-50 mt-8 relative">
      <div className="mx-auto">
        <Avatar hero={hero} className="flex justify-center -mt-8"></Avatar>
        <h3 data-cy="name" className="text-4xl font-semibold leading-normal text-slate-700 mb-2">
          {hero.name}
        </h3>
      </div>

      <div className="flex absolute top-4 left-4 justify-center gap-4">
        <div className="mr-4 text-center">
          <span
            data-cy="fans"
            className="text-xl font-bold block uppercase tracking-wide text-slate-600"
          >
            {hero.fans}
          </span>
          <span className="text-sm text-slate-400">Fans</span>
        </div>
        <div className="mr-4 text-center">
          <span
            data-cy="saves"
            className="text-xl font-bold block uppercase tracking-wide text-slate-600"
          >
            {hero.saves}
          </span>
          <span className="text-sm text-slate-400">Saves</span>
        </div>
        <div className="text-center">
          <span
            data-cy="price"
            className="text-xl font-bold block uppercase tracking-wide text-slate-600"
          >
            ${hero.price}
          </span>
          <span className="text-sm text-slate-400">Price</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center absolute top-4 right-4">
        <div className="w-full">
          <button
            className="bg-red-600 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => handleDeleteHero(hero)}
          >
            Delete Hero
          </button>
        </div>
      </div>

      <div className="px-8 py-4">
        <HeroForm hero={hero} powers={powers} onSave={handleUpdateHero} />
      </div>
    </div>
  );
};

export default HeroEditPage;
