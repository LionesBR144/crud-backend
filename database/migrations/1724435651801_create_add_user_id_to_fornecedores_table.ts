import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUserIdToFornecedores extends BaseSchema {
  protected tableName = 'fornecedor'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onDelete('CASCADE')
           .onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('user_id')
      table.dropColumn('user_id')
    })
  }
}