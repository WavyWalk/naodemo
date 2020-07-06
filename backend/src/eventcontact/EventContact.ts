import {BaseModel, Property} from "../lib/frontmodel/src"

export class EventContact extends BaseModel {

    @Property
    id?: number

    @Property
    eventId?: number

    @Property
    name?: string

    @Property
    phone?: string

    @Property
    email?: string

}