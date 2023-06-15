/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Hero, HeroEditModel } from '../models';
import { useAuth } from './auth.hook';
import { API_URL } from '../utils/constants';

const baseUrl = API_URL;

export function useHeroes() {
  const { getAccessToken } = useAuth();
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const getHeroes = () =>
    useQuery<Hero[]>({
      queryKey: ['heroes'],
      queryFn: async () => {
        const response = await fetch(`${baseUrl}/heroes`);
        const data = await response.json();
        return data;
      },
    });

  const getHero = (id: number) =>
    useQuery<Hero>({
      queryKey: ['hero', id],
      queryFn: async () => {
        const response = await fetch(`${baseUrl}/heroes/${id}`);
        const data = await response.json();
        return data;
      },
    });

  const createHero = useMutation({
    mutationFn: async ({
      hero,
      avatar,
    }: {
      hero: HeroEditModel;
      avatar?: File;
    }) => {
      const response = await fetch(`${baseUrl}/heroes`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(hero),
      });
      if (response.ok) {
        const data = await response.json();
        if (avatar) {
          const formData = new FormData();
          formData.append('avatar', avatar);
          await fetch(`${baseUrl}/heroes/${data.id}/avatar`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          });
        }
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Unknown error occurred');
      }
    },
    onSuccess: (data: Hero) => {
      const heroes = queryClient.getQueryData<Hero[]>(['heroes']) || [];
      const newHeroes = [...heroes, data];
      queryClient.setQueryData(['heroes'], newHeroes);
    },
  });

  const updateHero = useMutation({
    mutationFn: async ({
      hero,
      avatar,
    }: {
      hero: HeroEditModel;
      avatar?: File;
    }) => {
      const response = await fetch(`${baseUrl}/heroes/${hero.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(hero),
      });
      if (response.ok) {
        const data = await response.json();
        if (avatar) {
          const formData = new FormData();
          formData.append('avatar', avatar);
          await fetch(`${baseUrl}/heroes/${hero.id}/avatar`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          });
        }
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Unknown error occurred');
      }
    },
    onSuccess: (data: Hero) => {
      const heroes = queryClient.getQueryData<Hero[]>(['heroes']);
      const newHeroes = heroes?.map((hero) => {
        if (hero.id === data.id) {
          return data;
        }
        return hero;
      });
      queryClient.setQueryData(['heroes'], newHeroes);
      queryClient.setQueryData(['hero', data.id], data);
    },
  });

  const updatePartialMutation = useMutation({
    mutationFn: async (hero: Partial<HeroEditModel>) => {
      const response = await fetch(`${baseUrl}/heroes/${hero.id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify(hero),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Unknown error occurred');
      }
    },
    onSuccess: (data: Hero) => {
      const heroes = queryClient.getQueryData<Hero[]>(['heroes']);
      const newHeroes = heroes?.map((hero) => {
        if (hero.id === data.id) {
          return data;
        }
        return hero;
      });
      queryClient.setQueryData(['heroes'], newHeroes);
      queryClient.setQueryData(['hero', data.id], data);
    },
  });

  const updatePartialHero = (hero: Partial<HeroEditModel>) => {
    return updatePartialMutation.mutate(hero);
  };

  const deleteMutation = useMutation({
    mutationFn: async (hero: Hero) => {
      await fetch(`${baseUrl}/heroes/${hero.id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      return hero;
    },
    onSuccess: (data) => {
      const heroes = queryClient.getQueryData<Hero[]>(['heroes']);
      const newHeroes = heroes?.filter((hero) => {
        return hero.id !== data.id;
      });
      queryClient.setQueryData(['heroes'], newHeroes);
    },
  });

  const deleteHero = (hero: Hero) => deleteMutation.mutate(hero);

  return {
    getHeroes,
    getHero,
    createHero,
    updateHero,
    updatePartialHero,
    deleteHero,
  };
}
