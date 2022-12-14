import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { faker } from '@faker-js/faker'

const makeSut = (secret = faker.datatype.uuid()): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const secret = faker.datatype.uuid()
    const sut = makeSut(secret)
    const signSpy = jest.spyOn(jwt, 'sign')
    const id = faker.datatype.uuid()
    await sut.encrypt(id)

    expect(signSpy).toHaveBeenCalledWith({ id }, secret)
  })

  it('Should return a token on jwt sign success', async () => {
    const sut = makeSut()
    const token = faker.datatype.uuid()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => token)

    const accessToken = await sut.encrypt(faker.datatype.uuid())

    expect(accessToken).toBe(token)
  })

  it('Should throw if jwt sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.encrypt(faker.datatype.uuid())

    await expect(promise).rejects.toThrow()
  })
})
