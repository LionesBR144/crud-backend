import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import Fornecedor from './fornecedor.js';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class User extends BaseModel {
  public static table = 'users';

  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare fullName: string;

  @column()
  declare email: string;

  @column()
  declare password: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasMany(() => Fornecedor)
  declare fornecedores: HasMany<typeof Fornecedor>;

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}