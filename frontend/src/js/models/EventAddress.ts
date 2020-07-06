import {BaseModel, Property} from "../libs/frontmodel/src"

export class EventAddress extends BaseModel {

    @Property
    id?: number

    @Property
    eventId?: number

    @Property
    country?: string

    @Property
    city?: string

    @Property
    street?: string

    @Property
    streetNumber?: string

    @Property
    zipCode?: string

    @Property
    geo?: any

}