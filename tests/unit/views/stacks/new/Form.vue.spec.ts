import '../../../setup'

import { ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import Sinon, { SinonSandbox, SinonSpyStatic } from 'sinon'
import nock from 'nock'
import { shallowMount } from '../../../mount'
import Form from '@/views/stacks/new/Form.vue'

function createShallowWrapper(attrs?: ThisTypedShallowMountOptions<Form>): [Wrapper<Form>, Form] {
  const wrapper = shallowMount(Form, attrs)
  const vue: Form = wrapper.vm
  return [wrapper, vue]
}

describe('stacks/new/Form.vue', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = Sinon.createSandbox()
    nock.disableNetConnect()
  })

  afterEach(() => {
    sandbox.restore()
    nock.cleanAll()
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
      const scope = nock('http://localhost:5100').post('/stacks.json').reply(200, { id: 123 })

      await vue.create()

      expect(routerSpy).to.have.been.calledOnceWith({ name: 'StackRank', params: { id: 123 } })
      expect(scope.isDone()).to.be.true
    })

    it('handles validation errors', async () => {
      const scope = nock('http://localhost:5100')
        .post('/stacks.json')
        .reply(422, { errors: { name: [{ error: 'can’t be blank' }] } })

      await vue.create()

      expect(vue.errors).to.eql({ name: [{ error: 'can’t be blank' }] })
      expect(scope.isDone()).to.be.true
    })

    // it('handles other errors', async () => {
    //   const scope = nock('http://localhost:5100')
    //     .post('/stacks.json')
    //     .reply(500, { error: true })
    //
    //   await vue.create()
    //   expect(vue.errors).to.eql('Invalid HTTP response: 500 (Internal Server Error)')
    //   expect(scope.isDone()).to.be.true
    // })
  })
})
