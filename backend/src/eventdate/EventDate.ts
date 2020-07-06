import {BaseModel, HasOne, Property} from "../lib/frontmodel/src"
import {Event} from "../event/Event"

export class EventDate extends BaseModel {

    @Property
    id?: number

    @Property
    eventId?: number

    @Property
    date?: string

    @HasOne('Event')
    event?: Event

}