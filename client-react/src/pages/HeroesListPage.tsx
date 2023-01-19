import React from 'react';
import { useNavigate } from 'react-router';
import { AlertModal } from '../components/AlertModal';
import HeroCard from '../components/HeroCard';
import { ConfirmHireModal } from '../components/ConfirmHireModal';
import { useAuth } from '../hooks/auth.hook';
import { useHeroes } from '../hooks/heroes.hook';
import { useModal } from '../hooks/modal.hook';
import { Hero, HeroEditModel } from '../models';
import { ConfirmDeleteHeroModal } from '../components/ConfirmDeleteHeroModal';

interface HeroesListPageProps {}

const HeroesListPage: React.FC<HeroesListPageProps> = () => {
  const {
    getHeroes,
    updatePartialHero,
    deleteHero
  } = useHeroes();
  const { data: heroes } = getHeroes();
  const { user } = useAuth();
  const { setModal } = useModal();
  const nav = useNavigate();

  const handleLikeHero = (hero: Hero) => {
    if (!user) {
      setModal(
        <AlertModal onDismiss={() => setModal(undefined)}>
          You must log in to like.
        </AlertModal>
      );
      return;
    }
    const heroUpdate: Partial<HeroEditModel> = {
      id: hero.id,
      fans: hero.fans + 1,
    };
    updatePartialHero(heroUpdate);
  };

  const handleHireHero = (hero: Hero) => {
    if (!user) {
      setModal(
        <AlertModal onDismiss={() => setModal(undefined)}>
          You must log in to hire this hero.
        </AlertModal>
      );
      return;
    }
    setModal(
      <ConfirmHireModal
        hero={hero}
        onHire={() => {
          const heroUpdate: Partial<HeroEditModel> = {
            id: hero.id,
            saves: hero.saves + 1,
          };
          updatePartialHero(heroUpdate);
          setModal(undefined);
        }}
        onDismiss={() => setModal(undefined)}
      />
    );
  };

  const handleEditHero = (hero: Hero) => {
    nav(`/heroes/${hero.id}/edit`);
  };

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

  return (
    <ul className="flex flex-wrap gap-8 justify-between">
      {heroes?.map((hero) => (
        <HeroCard
          key={hero.id}
          user={user}
          hero={hero}
          onLikeHero={() => handleLikeHero(hero)}
          onHireHero={() => handleHireHero(hero)}
          onEditHero={() => handleEditHero(hero)}
          onDeleteHero={() => handleDeleteHero(hero)}
        />
      ))}
    </ul>
  );
};

export default HeroesListPage;
