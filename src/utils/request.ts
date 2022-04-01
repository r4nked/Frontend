import { Err, Ok, Result } from 'ts-results'
import { isUndefined } from 'lodash-es'
import { Errors } from '@/types'

let backendURL: string
if (process.env.NODE_ENV === 'production') backendURL = 'https://r4nked.herokuapp.com'
else backendURL = 'http://localhost:5100'

export default async function request<T>({
  method,
  path,
  body,
  headers
}: {
  method?: string;
  path: string;
  body?: unknown;
  headers?: HeadersInit;
}): Promise<Result<T, Errors>> {
  const url = backendURL + path
  const JSONBody = isUndefined(body) ? undefined : JSON.stringify(body)

  const req = new Request(url, {
    method: method || 'get',
    body: JSONBody,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  const response = await fetch(req)

  if (response.ok) {
    const object: T = await response.json()
    return new Ok(object)
  }
  if (response.status === 422) {
    const { errors } = await response.json()
    return new Err(errors)
  }
  throw new Error(`Invalid HTTP response: ${response.status} (${response.statusText})`)
}
