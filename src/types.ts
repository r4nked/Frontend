export interface Card {
  name: string;
}

interface Ranking {
  name: string;
  ranking: number;
}

export interface Stack {
  name: string;
  created_at: string;
  pairs_order: [number, number][];
  id: string;
  cards: Card[];
  rankings?: Ranking[];
}

export interface Error {
  error: string;
  [key: string]: number | string | null;
}

export enum Choice {
  First = 1,
  Second,
  Both
}

export type Errors = Record<string, Error[]>
