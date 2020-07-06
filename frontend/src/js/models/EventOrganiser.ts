import {BaseModel, HasMany, HasOne, ModelCollection, Property, ApiEndpoint, RequestOptions} from '../libs/frontmodel/src'
import {User} from "./User"
import {Event} from "./Event"

export class EventOrganiser extends BaseModel {

    @Property
    id?: number

    @Property
    userId?: number

    @Property
    price?: number

    @Property
    title?: string

    @Property
    name?: number

    @Property
    phone?: string

    @Property
    website?: string

    @HasOne('User')
    user?: User

    @HasMany('Event')
    events!: ModelCollection<Event>

    @ApiEndpoint('GET', {url: `/api/eventOrganiser/ofUser/:userId`})
    static indexOfUser: (options: RequestOptions & { wilds: { userId: any } }) => Promise<ModelCollection<EventOrganiser>>

    static async afterIndexOfUserRequest(options: RequestOptions) {
        return this.afterIndexRequest(options)
    }

    @ApiEndpoint('POST', {url: `/api/eventOrganiser/create`})
    create!: (options?: RequestOptions) => Promise<EventOrganiser>

}

