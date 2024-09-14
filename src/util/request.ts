import { Err, Ok, Result } from 'ts-results'
import { isUndefined } from 'lodash-es'
import { type Errors } from '@/types'

let backendURL: string
if (import.meta.env.MODE === 'production') backendURL = 'https://ranked-backend.fly.dev'
else backendURL = 'http://127.0.0.1:5000'

export default async function request<T>({
  method,
  path,
  body,
  headers
}: {
  method?: string
  path: string
  body?: unknown
  headers?: HeadersInit
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
    },
    credentials: 'include'
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
