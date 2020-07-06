import {User} from "../user/User"
import {Account} from "../account/Account"
import {App} from "../App"
import {Role} from "../role/Role"
import {ModelCollection} from "../lib/frontmodel/src"
import {UserRepository} from "../user/UserRepository"
import {EventOrganiser} from "../eventorganiser/EventOrganiser"
import {EventOrganiserRepository} from "../eventorganiser/EventOrganiserRepository"
import {Event} from "./Event"
import {EventRepository} from "./EventRepository"
import {CategoryRepository} from "../category/CategoryRepository"
import {CategoryCache} from "../category/CategoryCache"
import {Category} from "../category/Category"
import {EventAddress} from "../eventaddress/EventAddress"
import {EventContact} from "../eventcontact/EventContact"
import {EventDate} from "../eventdate/EventDate"
import {EventSpeaker} from "../eventspeaker/EventSpeaker"
import fakerStatic from 'faker'

const generateUsers = async () => {
    for (let i = 0; i < 5; i++) {
        let user = new User()
        user.lastName = fakerStatic.name.lastName()
        user.firstName = fakerStatic.name.firstName()
        user.account = makeAccount()
        user.roles.push(new Role({id: FakeEventsGenerator.organiserRoleId}))
        user = await UserRepository.createUserRegister(user, {id: FakeEventsGenerator.organiserRoleId})
        await generateOrganisers(user)
    }
}

const makeAccount = () => {
    const account = new Account()
    account.email = fakerStatic.internet.email()
    account.password = '123'
    return account
}

const generateOrganisers = async (user: User) => {
    for (let i = 0; i < 5; i++ ) {
        const eventOrganiser = new EventOrganiser()
        eventOrganiser.phone = fakerStatic.phone.phoneNumber()
        eventOrganiser.name = fakerStatic.company.companyName()
        eventOrganiser.website = 'http://' + fakerStatic.internet.domainName()
        eventOrganiser.userId = user.id
        const response = await EventOrganiserRepository.create(eventOrganiser)
        eventOrganiser.id = response.id
        await generateEvent(eventOrganiser)
    }
}

const generateEvent = async (organiser: EventOrganiser) => {
    for (let i = 0; i < 5; i++) {
        let event = new Event()
        event.title = fakerStatic.commerce.productName()
        event.eventId = EventRepository.generateIdentifier()
        event.description = fakerStatic.hacker.phrase() + ' ' + fakerStatic.hacker.phrase()
        event.educationalPoints = fakerStatic.random.number(200)
        event.maxAtendees = fakerStatic.random.number({min: 1, max: 500})
        event.price = parseFloat(fakerStatic.commerce.price(1, 600))
        event = await prepareCategories(event)
        event.eventAddress = makeAddress()
        event.eventContact = makeContact()
        event = addDates(event)
        event = addSpeakers(event)
        event.eventOrganiser = organiser
        const result = await EventRepository.create(event)
    }
}

const addSpeakers = (event: Event) => {
    for (let i = 0; i < fakerStatic.random.number({min: 1, max: 3}); i++) {
        const speaker = new EventSpeaker()
        speaker.title = fakerStatic.name.title()
        speaker.firstName = fakerStatic.name.firstName()
        speaker.lastName = fakerStatic.name.lastName()
        speaker.description = fakerStatic.name.jobDescriptor()
        event.eventSpeakers.array.push(speaker)
    }
    return event
}

const makeContact = () => {
    const contact = new EventContact()
    contact.name = `${fakerStatic.name.title()} ${fakerStatic.name.firstName()} ${fakerStatic.name.lastName()}`
    contact.phone = fakerStatic.phone.phoneNumber()
    contact.email = fakerStatic.internet.email()
    return contact
}

const addDates = (event: Event) => {
    for (let i = 0; i < fakerStatic.random.number({min: 1, max: 5}); i++) {
        const date = fakerStatic.date.between('2020-07-07', '2020-12-31')
        event.eventDates.push(new EventDate({date: date}))
    }
    return event
}

const makeAddress = () => {
    const eventAddress = new EventAddress()
    eventAddress.city = fakerStatic.address.city()
    eventAddress.country = fakerStatic.address.country()
    eventAddress.streetNumber = fakerStatic.address.secondaryAddress()
    eventAddress.street = fakerStatic.address.streetName()
    eventAddress.zipCode = fakerStatic.address.zipCode()
    return eventAddress
}

function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
}

const prepareCategories = async (event: Event) => {
    const categoriesFrom = FakeEventsGenerator.categories

    let ids: any[] = []
    for (let i = 0; i < fakerStatic.random.number({min:1, max: 5}); i++) {
        ids.push(
            (fakerStatic.random.arrayElement(categoriesFrom.plain) as any).id
        )
    }
    ids = ids.filter(onlyUnique)
    ids.forEach((it)=>{
        event.plainCategories.array.push(new Category({id: it}))
    })
    ids = []
    for (let i = 0; i < fakerStatic.random.number({min:1, max: 5}); i++) {
        ids.push(
            (fakerStatic.random.arrayElement(categoriesFrom.targetAudience) as any).id
        )
    }
    ids = ids.filter(onlyUnique)
    ids.forEach((it)=>{
        event.targetAudienceCategories.array.push(new Category({id: it}))
    })
    ids = []
    for (let i = 0; i < fakerStatic.random.number({min:1, max: 5}); i++) {
        ids.push(
            (fakerStatic.random.arrayElement(categoriesFrom.field) as any).id
        )
    }
    ids = ids.filter((v, i, a) => a.indexOf(v) === i);
    ids.forEach((it)=>{
        event.fieldCategories.array.push(new Category({id: it}))
    })
    return event
}

export class FakeEventsGenerator {

    static organiserRoleId: number
    static categories: any = {
        field: [],
        plain: [],
        targetAudience: [],
    }

    static async loadCategories() {
        this.categories = {
            field: await CategoryRepository.findAllWithTypeField('FIELD'),
            plain: await CategoryRepository.findAllWithTypeField('CATEGORY'),
            targetAudience: await CategoryRepository.findAllWithTypeField('TARGET_AUDIENCE')
        }
    }

    static async getOrganiserRoleId() {
        if (!this.organiserRoleId) {
            const roles = await App.prisma.role.findMany({
                where: {
                    name: 'ORGANIZER'
                }
            })
            const role = roles[0]!
            this.organiserRoleId = role.id
        }
        return this.organiserRoleId
    }

    static async run() {
        await FakeEventsGenerator.getOrganiserRoleId()
        await this.loadCategories()
        await generateUsers()
    }

}