export class UnauthorizedError extends Error {
  constructor () {
    super('Invalid credentials')
    this.name = 'UnauthorizedError'
  }
}
