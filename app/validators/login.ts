import { rules, schema } from "@adonisjs/validator"

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required()])
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Invalid email address',
    'password.required': 'Password is required',
  }
}