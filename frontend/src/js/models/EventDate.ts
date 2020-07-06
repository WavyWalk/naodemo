import {BaseModel, HasOne, Property} from "../libs/frontmodel/src"
import {Event} from "./Event"

export class EventDate extends BaseModel {

    @Property
    id?: number

    @Property
    eventId?: number

    @HasOne('Event')
    event?: Event

    @Property
    date?: string | number

}