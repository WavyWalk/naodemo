import {BaseModel, Property} from "../libs/frontmodel/src"

export class EventSpeaker extends BaseModel {

    @Property
    id?: string

    @Property
    eventId?: string

    @Property
    title?: string

    @Property
    firstName?: string

    @Property
    lastName?: string

    @Property
    description?: string

}