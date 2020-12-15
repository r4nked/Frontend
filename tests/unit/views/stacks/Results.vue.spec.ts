import { expect } from 'chai'
import { shallowMount } from '../../mount'
import Results from '@/views/stacks/Results.vue'

describe('Results.vue', () => {
  describe('#shared', () => {
    it('returns the name of the person who shared the results', () => {
      const wrapper = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: 'Sancho' } }
        }
      })
      expect(wrapper.vm.shared).to.eql('Sancho')
    })

    it('returns the name of the person who shared the results (array)', () => {
      const wrapper = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: ['Sancho'] } }
        }
      })
      expect(wrapper.vm.shared).to.eql('Sancho')
    })

    it('returns null if these are not shared results', () => {
      const wrapper = shallowMount(Results, {
        mocks: {
          $route: { params: { id: 123 }, query: { name: null } }
        }
      })
      expect(wrapper.vm.shared).to.be.null
    })
  })

  describe('#share', () => {
    it('generates a share link')
  })
})
