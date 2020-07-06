import {BaseModel, Property} from "../libs/frontmodel/src"

export class Role extends BaseModel {

    @Property
    id?: number

    @Property
    name?: string

}