import { expect } from 'chai'
import { decode, encode } from '@/utils/coding'

describe('#encode', () => {
  it('encodes a series of results as a packed base-36 integer', () => {
    const results = [1, 2, 2, 3, 1, 2, 3, 1, 2, 1, 1]
    expect(encode(results)).to.eql('11q3p')
  })

  it('handles empty results', () => {
    expect(encode([])).to.eql('0')
  })
})

describe('#decode', () => {
  it('decodes a packed base-36 integer into a series of results', () => {
    const string = '11q3p'
    expect(decode(string)).to.eql([1, 2, 2, 3, 1, 2, 3, 1, 2, 1, 1])
  })

  it('handles empty strings', () => {
    expect(decode('')).to.eql([0])
  })
})
