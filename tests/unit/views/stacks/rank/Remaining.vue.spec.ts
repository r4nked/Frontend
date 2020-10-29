/* eslint-disable camelcase */

import { expect } from 'chai'
import { shallowMount } from '../../../mount'
import Remaining from '@/views/stacks/rank/Remaining.vue'
import { Stack } from '@/types'

describe('Remaining.vue', () => {
  describe('#remaining', () => {
    let stack: Stack

    beforeEach(() => {
      stack = {
        name: 'stack',
        created_at: 'now',
        id: '1',
        cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }],
        pairs_order: [[0, 1], [0, 2], [1, 2]]
      }
    })

    it('returns the number of remaining cards (singular)', () => {
      const vue = shallowMount(Remaining, {
        propsData: { stack, matches: [2, 2] },
        stubs: ['router-link']
      }).vm
      expect(vue.remaining).to.eql('One choice remaining.')
    })

    it('returns the number of remaining cards (plural)', () => {
      const vue = shallowMount(Remaining, {
        propsData: { stack, matches: [2] },
        stubs: ['router-link']
      }).vm
      expect(vue.remaining).to.eql('2 choices remaining.')
    })
  })
})
