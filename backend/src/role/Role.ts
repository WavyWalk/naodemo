import {BaseModel, Property} from "../lib/frontmodel/src"

export class Role extends BaseModel {

    @Property
    id?: number

    @Property
    name?: string

}