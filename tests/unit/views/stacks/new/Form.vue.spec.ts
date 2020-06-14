import '../../../setup'

import { ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import Sinon, { SinonSandbox, SinonSpyStatic } from 'sinon'
import { getLocal, Mockttp } from 'mockttp'
import { shallowMount } from '../../../mount'
import Form from '@/views/stacks/new/Form.vue'

function createShallowWrapper(
  attrs?: ThisTypedShallowMountOptions<Form>
): [Wrapper<Form>, Form] {
  const wrapper = shallowMount(Form, attrs)
  const vue: Form = wrapper.vm
  return [wrapper, vue]
}

describe('stacks/new/Form.vue', () => {
  let sandbox: SinonSandbox
  let mockServer: Mockttp

  beforeEach(() => {
    sandbox = Sinon.createSandbox()
    mockServer = getLocal()
    mockServer.start(5100)
  })

  afterEach(() => {
    sandbox.restore()
    mockServer.stop()
  })

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
      await mockServer.post('/stacks.json').thenReply(200, '{"id":123}')
      await vue.create()
      expect(routerSpy).to.have.been.calledOnceWith({ name: 'StackRank', params: { id: 123 } })
    })

    it('handles validation errors', async () => {
      await mockServer.post('/stacks.json')
        .thenReply(422, '{"errors":{"name":[{"error":"can’t be blank"}]}}')
      await vue.create()
      expect(vue.errors).to.eql({ name: [{ error: 'can’t be blank' }] })
    })

    // it('handles other errors', async () => {
    //   await mockServer.post('/stacks.json').thenReply(500, '{"error":true}')
    //   await vue.create()
    //   expect(vue.error).to.eql('Invalid HTTP response: 500 (Internal Server Error)')
    // })
  })
})
