/* eslint-disable @typescript-eslint/camelcase */

import { expect } from 'chai'
import { shallowMount } from '../../../mount'
import Choices from '@/views/stacks/rank/Choices.vue'

describe('Choices.vue', () => {
  describe('#match', () => {
    it('returns the cards for a match', () => {
      const vue = shallowMount(Choices, {
        propsData: {
          stack: {
            name: 'stack',
            created_at: 'now',
            id: '1',
            cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }],
            pairs_order: [[0, 1], [0, 2], [1, 2]]
          },
          matches: [2]
        }
      }).vm
      expect(vue.match).to.eql([{ name: 'One' }, { name: 'Three' }])
    })
  })
})
