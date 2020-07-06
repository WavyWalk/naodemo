import {BaseModel, HasMany, HasOne, ModelCollection, Property} from "../lib/frontmodel/src"
import {Account} from "../account/Account"
import {Role} from "../role/Role"

export class User extends BaseModel {

    @Property
    id?: number

    @Property
    identifier?: string

    @Property
    title?: string

    @Property
    salutation?: string

    @Property
    firstName?: string

    @Property
    lastName?: string

    @Property
    tosAccepted?: boolean

    @Property
    newsletterAccepted?: boolean

    @HasOne('Account')
    account?: Account

    @HasMany('Role')
    roles!: ModelCollection<Role>
}