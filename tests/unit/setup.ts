/* eslint-disable mocha/no-top-level-hooks, import/no-mutable-exports */

import 'cross-fetch/polyfill'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import Sinon, { SinonSandbox } from 'sinon'
import backend from './backend'

chai.use(sinonChai)

let sandbox: SinonSandbox

beforeEach(() => {
  sandbox = Sinon.createSandbox()
  backend.listen()
})

afterEach(() => {
  sandbox.restore()
  backend.resetHandlers()
})

after(() => backend.close())

// eslint-disable-next-line mocha/no-exports,import/prefer-default-export
export { sandbox }
