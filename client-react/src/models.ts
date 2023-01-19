export interface Hero {
  id: number;
  name: string;
  avatarUrl: string;
  powers: Power[];
  price: number;
  saves: number;
  fans: number;
}

export interface HeroEditModel extends Omit<Hero, 'id' | 'avatarUrl' | 'powers'> {
  id?: number;
  powers: number[];
}

export interface Power {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}
