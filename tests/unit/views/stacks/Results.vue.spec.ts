import { expect } from 'chai'
import { Wrapper } from '@vue/test-utils'
import { shallowMount } from '../../mount'
import { sandbox } from '../../setup'
import Results from '@/views/stacks/Results.vue'

describe('Results.vue', () => {
  describe('#shared', () => {
    it('returns the name of the person who shared the results', () => {
      const wrapper: Wrapper<Results> = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: 'Sancho' } },
          $router: { resolve: () => ({ href: '/stacks/123' }) }
        }
      })
      expect(wrapper.vm.shared).to.eql('Sancho')
    })

    it('returns the name of the person who shared the results (array)', () => {
      const wrapper: Wrapper<Results> = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: ['Sancho'] } },
          $router: { resolve: () => ({ href: '/stacks/123' }) }
        }
      })
      expect(wrapper.vm.shared).to.eql('Sancho')
    })

    it('returns null if these are not shared results', () => {
      const wrapper: Wrapper<Results> = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: null } },
          $router: { resolve: () => ({ href: '/stacks/123' }) }
        }
      })
      expect(wrapper.vm.shared).to.be.null
    })
  })

  describe('#share', () => {
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('generates a share link', () => {
      const promptSpy = sandbox.stub(window, 'prompt').returns('Sancho')
      const wrapper: Wrapper<Results> = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: null } },
          $router: { resolve: () => ({ href: '/stacks/123' }) }
        }
      })

      wrapper.vm.share()

      expect(promptSpy).to.have.been.calledOnceWith('What’s your name?')
      expect(promptSpy).to.have.been.calledOnceWith(
        'Copy this link and share with your friends:',
        'http://localhost/stacks/123?name=Sancho'
      )

      promptSpy.restore()
    })
  })
})
