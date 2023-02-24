import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').unsigned().primary()
      table.integer('id_type').unsigned().notNullable()
      table.string('first_names', 100).notNullable()
      table.string('last_names', 100).notNullable()      
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('profile_id').unsigned().notNullable().references('profiles.id')
      table.string('address', 255).notNullable()
      table.string('neighborhood', 100).notNullable()
      table.string('municipality', 100).notNullable()
      table.string('department', 100).notNullable()

      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
