import { MissingParamError } from '../../../src/presentation/errors'
import { RequiredFieldValidation } from '../../../src/presentation/validators'
import { faker } from '@faker-js/faker'
interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (fieldName: string): SutTypes => {
  const sut = new RequiredFieldValidation(fieldName)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  it('Should return MissingParamError if validation fails', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ field: '' })
    expect(error).toEqual(new MissingParamError(field))
  })
})