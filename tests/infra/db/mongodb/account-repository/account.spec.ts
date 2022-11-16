import { AccountMongoRepository } from '../../../../../src/infra/db/mongodb/account-repository/account'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers/mongo-helper'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return an account on success', async () => {
    const sut = makeSut()
    const isValid = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(isValid).toBe(true)
  })
})