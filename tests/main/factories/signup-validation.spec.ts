import { Validation } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers/signup/signup-validation-factory'
import { RequiredFieldValidation, ValidationComposite, EmailValidation, CompareFieldsValidation } from '@/validations/validators'
import { EmailValidator } from '@/validations/protocols'

jest.mock('@/validations/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
