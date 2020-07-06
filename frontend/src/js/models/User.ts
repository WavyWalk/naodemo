import {BaseModel, HasOne, Property, ApiEndpoint, RequestOptions,HasMany, ModelCollection} from "../libs/frontmodel/src"
import {Account} from "./Account"
import {EventOrganiser} from "./EventOrganiser"
import {Role} from "./Role"

export class User extends BaseModel {

    @Property
    id?: number

    @Property
    identifier?: string

    @Property
    title?: string

    @Property
    salutation?: string

    @Property
    firstName?: string

    @Property
    lastName?: string

    @Property
    tosAccepted?: boolean

    @Property
    newsletterAccepted?: boolean

    @HasOne('Account')
    account?: Account

    @HasMany('EventOrganiser')
    eventOrganisers!: ModelCollection<EventOrganiser>

    @HasMany('Role')
    roles!: ModelCollection<Role>

    @ApiEndpoint('POST', {url: '/api/user/registration/organiser'})
    createOrganizer!: (options?: RequestOptions) => Promise<User>

    beforeCreateOrganizerRequest(options: RequestOptions) {
        return this.beforeCreateRequest(options)
    }

    async afterCreateOrganizerRequest(options: RequestOptions) {
        return await this.afterCreateRequest(options)
    }

    @ApiEndpoint("POST", {url: `/api/session/login`})
    login!: (options?: RequestOptions) => Promise<User>

    beforeLoginRequest(options: RequestOptions) {
        this.beforeCreateRequest(options)
    }

    async afterLoginRequest(options: RequestOptions) {
        return await this.afterCreateRequest(options)
    }

    @ApiEndpoint('DELETE', {url: `/api/session/logout`})
    logout!: (options?: RequestOptions) => Promise<User>

    beforeLogoutRequest(options: RequestOptions) {
        this.beforeCreateRequest(options)
    }

    async afterLogoutRequest(options: RequestOptions) {
        return await this.afterCreateRequest(options)
    }

}