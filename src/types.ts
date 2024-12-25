export interface Card {
  name: string
}

interface Ranking {
  name: string
  ranking: number
}

export interface Stack {
  name: string
  created_at: string
  pairs_order: [number, number][]
  id: string
  cards: Card[]
  rankings?: Ranking[]
}

export interface ValidationError {
  error: string
  [key: string]: number | string | null
}

// export enum Choice {
//   First = 1,
//   Second,
//   Both
// }

export type Errors = Record<string, ValidationError[]>

export function errorsToString(errors: Errors) {
  return Object.entries(errors)
    .map(([key, value]) => {
      return `${key}: ${value.map((error) => error.error).join(', ')}`
    })
    .join('\n')
}
