import { useQuery } from '@tanstack/react-query';
import { Power } from '../models';

const baseUrl = import.meta.env.VITE_API_URL;

export function usePowers() {

  const getPowers = () =>
    useQuery<Power[]>({
      queryKey: ['powers'],
      queryFn: async () => {
        const response = await fetch(`${baseUrl}/powers`);
        const data = await response.json();
        return data;
      },
    });

  return {
    getPowers,
  };
}
