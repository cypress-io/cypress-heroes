import { useContext } from 'react';
import { CyHeroesContext } from '../components/CyHeroesProvider';

export function useModal() {
  const context = useContext(CyHeroesContext);

  return {
    modal: context.modal,
    setModal: context.setModal,
  };
}
