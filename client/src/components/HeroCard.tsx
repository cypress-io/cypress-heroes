import React from 'react';
import { Hero, User } from '../models';
import { shortNumber } from '../utils/format';
import { Avatar } from './Avatar';
import IconButton from './IconButton';

interface HeroCardProps extends React.PropsWithChildren {
  hero: Hero;
  hideButtons?: boolean;
  user?: User;
  onEditHero?: (hero: Hero) => void;
  onLikeHero?: (hero: Hero) => void;
  onHireHero?: (hero: Hero) => void;
  onDeleteHero?: (hero: Hero) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({
  hero,
  hideButtons,
  user,
  onEditHero = () => {},
  onLikeHero = () => {},
  onHireHero = () => {},
  onDeleteHero = () => {},
}) => {
  return (
    <li className="mt-8 list-none" data-cy="hero-card">
      <div className="w-[280px] rounded-lg border shadow-md bg-gray-50">
        <div className="flex flex-col items-center">
          <Avatar className="-mt-8" hero={hero} />
          <div className="flex justify-center">
            <div className="p-2 text-center">
              <span
                data-cy="price"
                className="text-xl font-bold block uppercase tracking-wide text-slate-700"
              >
                ${shortNumber(hero.price)}
              </span>
              <span className="text-sm text-slate-400">Price</span>
            </div>
            <div className="p-2 text-center">
              <span
                data-cy="fans"
                className="text-xl font-bold block uppercase tracking-wide text-slate-700"
              >
                {shortNumber(hero.fans)}
              </span>
              <span className="text-sm text-slate-400">Fans</span>
            </div>
            <div className="p-2 text-center">
              <span
                data-cy="saves"
                className="text-xl font-bold block uppercase tracking-wide text-slate-700"
              >
                {shortNumber(hero.saves)}
              </span>
              <span className="text-sm text-slate-400">Saves</span>
            </div>
          </div>
          <h5 data-cy="name" className="mb-1 text-xl font-medium text-gray-500">
            {hero.name}
          </h5>
          <div
            data-cy="powers"
            className="flex flex-col text-sm items-center text-gray-400 h-[40px]"
          >
            <ul className="flex gap-2">
              {hero.powers.map((power, i) =>
                i < 2 ? (
                  <li key={i}>
                    {power.name} {i === 0 && hero.powers.length > 1 ? ',' : ''}
                  </li>
                ) : null
              )}
            </ul>
            {hero.powers.length > 2 && (
              <ul className="flex items-center gap-2 text-sm text-gray-400">
                <li data-cy="more">+{hero.powers.length - 2} more</li>
              </ul>
            )}
          </div>

          {!hideButtons && (
            <div className="flex flex-col mt-2 gap-2 mb-8">
              <div className="flex gap-2">
                <IconButton icon="like" onClick={() => onLikeHero(hero)} />
                <IconButton icon="money" onClick={() => onHireHero(hero)} />
              </div>
              {user?.isAdmin && (
                <div className="flex gap-2">
                  <IconButton icon="pencil" onClick={() => onEditHero(hero)} />
                  <IconButton icon="trash" onClick={() => onDeleteHero(hero)} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default HeroCard;
