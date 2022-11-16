import {
  AddAccountModel,
  AddAccount,
  Encrypter,
  AddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<boolean> {
    const hashedPassword = await this.encrypter
      .encrypt(accountData.password)
    const isValid = await this.addAccountRepository
      .add({ ...accountData, password: hashedPassword })
    return isValid
  }
}
