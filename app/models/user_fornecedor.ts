import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserFornecedor extends BaseModel {

  public static table = 'fornecedor'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare fornecedorId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}