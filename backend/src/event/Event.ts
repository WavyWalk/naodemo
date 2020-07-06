import {BaseModel, HasMany, HasOne, ModelCollection, Property} from "../lib/frontmodel/src"
import {EventOrganiser} from "../eventorganiser/EventOrganiser"
import {Category} from "../category/Category"
import {EventAddress} from "../eventaddress/EventAddress"
import {EventContact} from "../eventcontact/EventContact"
import {EventSpeaker} from "../eventspeaker/EventSpeaker"
import {EventDate} from "../eventdate/EventDate"

export class Event extends BaseModel {

    @Property
    id?: number

    @Property
    price?: number

    @Property
    eventId?: string

    @Property
    maxAtendees?: number

    @Property
    eventOrganiserId?: number

    @HasOne('EventOrganiser')
    eventOrganiser?: EventOrganiser

    @Property
    title?: string

    @Property
    educationalPoints?: number

    @Property
    additionalInformation?: string

    @Property
    description?: string

    @HasMany('Category')
    categories!: ModelCollection<Category>

    @HasMany('Category')
    fieldCategories!: ModelCollection<Category>

    @HasMany('Category')
    plainCategories!: ModelCollection<Category>

    @HasMany('Category')
    targetAudienceCategories!: ModelCollection<Category>

    @HasOne('EventAddress')
    eventAddress?: EventAddress

    @HasOne('EventContact')
    eventContact?: EventContact

    @HasMany('EventSpeaker')
    eventSpeakers!: ModelCollection<EventSpeaker>

    @HasMany('EventDate')
    eventDates!: ModelCollection<EventDate>
}