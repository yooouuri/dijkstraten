import { customAlphabet } from 'nanoid'

export const randomId = function (size = 12) {
  const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', size)

  return nanoid()
}
