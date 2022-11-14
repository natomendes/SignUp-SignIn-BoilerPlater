import * as bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/criptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: jest.fn(async (): Promise<string> => await new Promise(resolve => resolve('hash')))
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  it('Should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
      () => {
        throw new Error()
      })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
