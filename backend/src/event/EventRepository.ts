import {Event} from "./Event"
import {App} from "../App"
import {EventAddress} from "../eventaddress/EventAddress"
import {EventContact} from "../eventcontact/EventContact"
import {EventDate} from "../eventdate/EventDate"
import {ModelCollection} from "../lib/frontmodel/src"
import {Category} from "../category/Category"
import {CategoryCache} from "../category/CategoryCache"
import {EventSpeaker} from "../eventspeaker/EventSpeaker"
import {CategoryRepository} from "../category/CategoryRepository"
import {v1} from 'uuid'

export class EventRepository {

    static generateIdentifier = () => {
        const uuid = v1()
        return uuid.split('-')[0].toUpperCase()
    }

    static async create(event: Event) {
        const payload = {
            data: {
                title: event.title,
                eventId: this.generateIdentifier(),
                description: event.description,
                additionalInformation: event.additionalInformation,
                educationalPoints: parseInt(event.educationalPoints as any),
                maxAtendees: parseInt(event.maxAtendees as any),
                price: this.preparePrice(event.price as any),
                eventAddress: this.buildAddress(event.eventAddress),
                eventContact: this.buildEventContact(event.eventContact),
                eventDates: this.buildEventDates(event.eventDates),
                categories: await this.buildCategories(
                    event.fieldCategories,
                    event.plainCategories,
                    event.targetAudienceCategories
                ),
                eventSpeakers: this.addSpeakers(event.eventSpeakers),
                eventOrganiser: {
                    connect: {
                        id: event.eventOrganiser!.id!
                    }
                }
            }
        }
        return await App.prisma.event.create(payload)
    }

    static preparePrice(price: any) {
        if (!price) {
            return null
        }
        return parseFloat(price)
    }

    static async getById(eventId: number) {
        const event = await App.prisma.event.findOne({
            where: {
                id: eventId
            },
            include: {
                eventContact: true,
                eventOrganiser: true,
                eventAddress: true,
                eventDates: true,
                eventSpeakers: true
            }
        })
        if (!event) {
            return null
        }
        const fieldCategories = await CategoryRepository.loadForEvent(eventId, 'FIELD')
        const targetAudienceCategories = await CategoryRepository.loadForEvent(eventId, 'TARGET_AUDIENCE')
        const plainCategories = await CategoryRepository.loadForEvent(eventId, 'CATEGORY')
        return {...event, ...{fieldCategories, targetAudienceCategories, plainCategories}}
    }

    static findByUserOrganisers = async (userId: number) => {
        return await App.prisma.event.findMany({
            where: {
                eventOrganiser: {
                    user: {
                        id: userId
                    }
                }
            },
            include: {
                eventContact: true,
                eventOrganiser: true,
                eventAddress: true,
                eventDates: true,
                eventSpeakers: true
            }
        })
    }

    static async findAll() {
        let events = await App.prisma.event.findMany({
            include: {
                eventContact: true,
                eventOrganiser: true,
                eventAddress: true,
                eventDates: true,
                eventSpeakers: true,
                categories: true,
            }
        })
        events = this.classifyCategories(events)
        return events
    }

    private static buildAddress(address?: EventAddress) {
        if (!address) {
            return null
        }
        return {
            create: {
                city: address.city,
                country: address.country,
                street: address.street,
                streetNumber: address.streetNumber,
                zipCode: address.zipCode,
            }
        }
    }

    private static buildEventContact(eventContact?: EventContact) {
        if (!eventContact) {
            return null
        }
        return {
            create: {
                email: eventContact.email,
                name: eventContact.name,
                phone: eventContact.phone,
            }
        }
    }

    private static buildEventDates(dates: ModelCollection<EventDate>) {
        if (dates?.array?.length < 1) {
            return null
        }
        return {
            create: dates.map((it)=>{
                return {
                    date: it.date
                }
            })
        }
    }

    private static async buildCategories(
        fieldCategories: ModelCollection<Category>,
        plainCategories: ModelCollection<Category>,
        targetAudienceCategories: ModelCollection<Category>
    ) {
        const data: {connect: {id: number}[]} = {connect: []}
        const categoryIdsToAdd: {[id:number]: number} = {}
        const categoryMap = await CategoryCache.getMappedByIdWithParents()
        fieldCategories.array.forEach((it)=>{
            const id = it.id!
            const category = categoryMap[id]
            categoryIdsToAdd[id] = id
            EventRepository.addAllParents(category, categoryIdsToAdd)
        });

        plainCategories.array.forEach((it)=>{
            categoryIdsToAdd[it.id!] = it.id!
        })
        targetAudienceCategories.array.forEach((it)=>{
            categoryIdsToAdd[it.id!] = it.id!
        })
        let ids = (Object.values(categoryIdsToAdd)).map((id)=>{
            return {
                id
            }
        })
        data.connect = ids
        return data
    }

    private static addAllParents(category: Category, categoryIdsToAdd: { [p: number]: number }) {
        if (category.parent) {
            categoryIdsToAdd[category.parent.id!] = category.parent.id!
            this.addAllParents(category.parent!, categoryIdsToAdd)
        }
    }


    private static addSpeakers(speakers: ModelCollection<EventSpeaker>) {
        return {
            create: speakers.array.map((it)=>{
                return {
                    description: it.description,
                    firstName: it.firstName,
                    lastName: it.lastName,
                    title: it.title,
                }
            })
        }

    }


    private static classifyCategories(events: any[]) {
        events = events.map((event: any)=>{
            let categories = event.categories ?? []
            const mappedByType: any = {}
            categories.forEach((it: any)=>{
                mappedByType[it.type] = mappedByType[it.type] ?? []
                mappedByType[it.type].push(it)
            })
            event.targetAudienceCategories = mappedByType['TARGET_AUDIENCE'] ?? []
            event.plainCategories = mappedByType['CATEGORY'] ?? []
            event.fieldCategories = mappedByType['FIELD'] ?? []
            delete event.categories
            return event
        })
        return events
    }
}