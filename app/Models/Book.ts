import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public title: string

  @column() public author: number

  @column() public publisher: number

  @column() public format: number

  @column() public print_length: number

  @column() public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
