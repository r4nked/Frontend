/* eslint-disable @typescript-eslint/camelcase */

import '../../setup'
import {
  ThisTypedShallowMountOptions, Wrapper
} from '@vue/test-utils'
import { expect } from 'chai'
import Sinon, { SinonSandbox, SinonSpyStatic } from 'sinon'
import { shallowMount } from '../../mount'
import Rank from '@/views/stacks/Rank.vue'
import { encode } from '@/utils/coding'
import { Stack } from '@/types'

function createShallowWrapper(
  attrs?: ThisTypedShallowMountOptions<Rank>
): [Wrapper<Rank>, Rank] {
  const wrapper = shallowMount(Rank, attrs)
  const vue: Rank = wrapper.vm
  return [wrapper, vue]
}

function makeStack(attrs: Partial<Stack>): Stack {
  return {
    name: 'stack',
    created_at: 'now',
    pairs_order: [],
    id: '1',
    cards: [],
    ...attrs
  }
}

describe('Rank.vue', () => {
  let sandbox: SinonSandbox
  let stack: Stack

  beforeEach(() => {
    sandbox = Sinon.createSandbox()

    stack = makeStack({
      cards: [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }],
      pairs_order: [[0, 1], [0, 2], [1, 2]]
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#matches', () => {
    it("returns an empty array for a null 'm' parameter", () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: null } }
        }
      })
      expect(vue.matches).to.eql([])
    })

    it("returns an empty array for an empty 'm' parameter", () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: [] } }
        }
      })
      expect(vue.matches).to.eql([])
    })

    it("returns the decoded matches for an 'm' parameter", () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: 'ab9fd' } }
        }
      })
      expect(vue.matches).to.eql([1, 0, 0, 2, 0, 1, 0, 3, 2, 1, 3, 2, 1])
    })

    it("returns the decoded matches for an 'm' array parameter", () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: ['ab9fd'] } }
        }
      })
      expect(vue.matches).to.eql([1, 0, 0, 2, 0, 1, 0, 3, 2, 1, 3, 2, 1])
    })
  })

  describe('#choose', () => {
    let routerSpy: SinonSpyStatic

    beforeEach(() => {
      routerSpy = sandbox.spy()
    })

    it('does nothing if the stack is null', async () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: encode([2]) } },
          $router: { push: routerSpy }
        }
      })

      await vue.choose(1)
      expect(routerSpy).not.to.have.been.called
    })

    it('adds a result to the matches list', async () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: encode([2]) } },
          $router: { push: routerSpy }
        }
      })

      vue.stack = stack
      await vue.choose(1)
      expect(routerSpy).to.have.been.calledOnceWith({ query: { m: encode([2, 1]) } })
    })

    it('navigates to the Results view if the matches are complete', async () => {
      const [, vue] = createShallowWrapper({
        mocks: {
          $route: { query: { m: encode([2, 1]) } },
          $router: { push: routerSpy }
        }
      })

      vue.stack = stack
      await vue.choose(3)
      expect(routerSpy).to.have.been.calledOnceWith({
        name: 'StackResults',
        query: { m: encode([2, 1, 3]) }
      })
    })
  })
})
