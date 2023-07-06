import { ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import { SinonSpyStatic } from 'sinon'
import { http, HttpResponse } from 'msw'
import { shallowMount } from '../../../mount'
import backend from '../../../backend'
import { sandbox } from '../../../setup'
import Form from '@/views/stacks/new/Form.vue'

function createShallowWrapper(attrs?: ThisTypedShallowMountOptions<Form>): [Wrapper<Form>, Form] {
  const wrapper = shallowMount(Form, attrs)
  const vue: Form = wrapper.vm
  return [wrapper, vue]
}

describe('stacks/new/Form.vue', () => {
  describe('created', () => {
    it('chooses a random placeholder', () => {
      const [, vue] = createShallowWrapper()
      expect(vue.placeholder).not.to.eql(null)
    })
  })

  describe('#create', () => {
    let vue: Form
    let routerSpy: SinonSpyStatic

    beforeEach(() => {
      routerSpy = sandbox.spy();

      [, vue] = createShallowWrapper({
        mocks: {
          $router: { push: routerSpy }
        }
      })
    })

    it('creates a new Stack', async () => {
      await vue.create()
      expect(routerSpy).to.have.been.calledOnceWith({ name: 'StackRank', params: { id: '1' } })
    })

    it('handles validation errors', async () => {
      backend.use(
        http.post('http://localhost:5100/stacks.json', () => HttpResponse.json(
          { errors: { name: [{ error: 'can’t be blank' }] } },
          { status: 422 }
        ))
      )

      await vue.create()
      expect(vue.errors).to.eql({ name: [{ error: 'can’t be blank' }] })
    })

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('handles other errors', async () => {
      const alertSpy = sandbox.stub(window, 'alert')
      backend.use(
        http.post('http://localhost:5100/stacks.json', () => HttpResponse.json(
          { error: true },
          { status: 500 }
        ))
      )

      await vue.create()
      expect(alertSpy).to.have.been.calledOnceWith('Invalid HTTP response: 500 (Internal Server Error)')
      expect(vue.errors).to.eql('Invalid HTTP response: 500 (Internal Server Error)')

      alertSpy.restore()
    })
  })
})
