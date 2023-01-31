import { token, user } from './storage'
import { toast } from './toast'

export const API_BASE = import.meta.env.VITE_VMSCHED_API

async function invoke(method: string, path: string, payload?: unknown) {
  const init: RequestInit = {
    method,
    headers: {
      'X-Token-Name': token.value.tokenName,
      'X-Token-Secret': token.value.tokenSecret
    }
  }
  if (payload) {
    init.headers = {
      ...init.headers,
      'Content-Type': 'application/json'
    }
    init.body = JSON.stringify(payload)
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, init)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const data = await res.json()
    if ('success' in data && !data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (err) {
    toast.error({
      title: 'Error',
      message: err instanceof Error ? err.message : 'Unknown error'
    })
    throw err
  }
}

type Will<T> = T | (() => T)
function will<T>(value: Will<T>): T {
  return typeof value === 'function' ? (value as () => T)() : value
}

function invoker<T, U>(method: string, path: Will<string>) {
  return async (payload: T) => invoke(method, will(path), payload) as Promise<U>
}

export interface IUser {
  balance: Record<string, number>
  name: string
  role: string
}
export const getUser = invoker<undefined, IUser>('GET', '/user')

export interface IInstanceType {
  description: string
  name: string
  price: Record<string, number>
}
export const getInstanceTypes = invoker<undefined, IInstanceType[]>(
  'GET',
  '/instance-type'
)
export const getInstanceType = (type: string) =>
  invoker<undefined, IInstanceType>('GET', `/instance-type/${type}`)(undefined)
export const getInstanceTypeQueueTime = (type: string, time?: string) =>
  invoker<undefined, { duration: string }>(
    'GET',
    `/instance-type/${type}/queue-time` + (time ? `?time=${time}` : '')
  )(undefined)

export interface IInstanceState {
  'cpu-usage': number
  'memory-usage': number
  name: string
  status: string
}
export const getInstanceState = (name: string) =>
  invoker<undefined, IInstanceState>(
    'GET',
    `/instance/${name}/state`
  )(undefined)
export const updateInstanceState = (
  name: string,
  action: string,
  force: boolean,
  stateful: boolean
) =>
  invoker<unknown, IBaseResponse>(
    'PUT',
    `/instance/${name}/state`
  )({ action, force, stateful })

export interface ITask {
  creation: string
  'queue-time': string
  'end-time': string
  instance: string
  'instance-type': string
  name: string
  status: string
}
export const getTasks = invoker<undefined, ITask[]>(
  'GET',
  () => `/user/${encodeURIComponent(user.value.name)}/task`
)
export const getTask = (name: string) =>
  invoker<undefined, ITask>(
    'GET',
    () => `/task/${encodeURIComponent(name)}`
  )(undefined)
export const updateTaskState = (
  name: string,
  lifeTime: string,
  status: string
) =>
  invoker<unknown, IBaseResponse>(
    'POST',
    () => `/task/${encodeURIComponent(name)}/state`
  )({
    ['life-time']: lifeTime,
    status
  })
export const deleteTask = (name: string) =>
  invoker<undefined, IBaseResponse>(
    'DELETE',
    () => `/task/${encodeURIComponent(name)}`
  )(undefined)

export interface IBaseResponse {
  message: string
  success: boolean
}
export const createTask = invoker<
  {
    'instance-type': string
    name: string
  },
  IBaseResponse
>('POST', () => `/user/${encodeURIComponent(user.value.name)}/task`)
