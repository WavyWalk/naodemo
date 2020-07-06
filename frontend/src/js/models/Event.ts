import {
    ApiEndpoint,
    BaseModel,
    HasMany,
    HasOne,
    ModelCollection,
    Property,
    RequestOptions
} from "../libs/frontmodel/src"
import {EventOrganiser} from "./EventOrganiser"
import {Category} from "./Category"
import {EventAddress} from "./EventAddress"
import {EventContact} from "./EventContact"
import {EventSpeaker} from "./EventSpeaker"
import {EventDate} from "./EventDate"
import {User} from "./User"

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

    @ApiEndpoint('POST', {url: `/api/event/create`})
    create!: (options?: RequestOptions) => Promise<Event>

    @ApiEndpoint('GET', {url: `/api/event/:eventId`})
    static show: (options: RequestOptions & {wilds: {eventId: any}}) => Promise<Event>

    @ApiEndpoint('GET', {url: `/api/event/ofUser/:userId`})
    static indexOfUser: (options: RequestOptions) => Promise<ModelCollection<Event>>

    static afterIndexOfUserRequest = async (options: RequestOptions) => {
        return await Event.afterIndexRequest(options)
    }

}