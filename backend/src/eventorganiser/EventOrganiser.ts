import {BaseModel, HasMany, HasOne, ModelCollection, Property} from "../lib/frontmodel/src"
import {User} from "../user/User"
import {Event} from "../event/Event"

export class EventOrganiser extends BaseModel {

    @Property
    id?: number

    @Property
    userId?: number

    @Property
    name?: string

    @Property
    phone?: string

    @Property
    website?: string

    @HasOne('User')
    user?: User

    @HasMany('Event')
    events!: ModelCollection<Event>

}