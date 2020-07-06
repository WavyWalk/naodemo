import {BaseModel, Property} from "../lib/frontmodel/src"

export class Account extends BaseModel {

    @Property
    id?: number

    @Property
    email?: string

    @Property
    password?: string

    @Property
    passwordConfirmation?: string

}