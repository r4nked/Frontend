import { http, HttpResponse } from 'msw'
import stackJSON from '../fixtures/stack.json'

const handlers = [
  http.post('http://localhost:5100/stacks.json', () => HttpResponse.json(
    stackJSON,
    { status: 201 }
  )),

  http.get('http://localhost:5100/stacks/123.json', () => HttpResponse.json(stackJSON))
]

export default handlers
