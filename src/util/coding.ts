import bigInt from 'big-integer'

export function encode(results: number[]): string {
  const resultsStr = results.map((r) => r.toString()).join('')
  const resultsNum = bigInt(resultsStr, 4)
  return resultsNum.toString(36)
}

export function decode(param: string): number[] {
  const resultsNum = bigInt(param, 36)
  const resultsStr = resultsNum.toString(4)
  const resultsArray = resultsStr.split('')
  return resultsArray.map((r) => Number.parseInt(r, 10))
}
