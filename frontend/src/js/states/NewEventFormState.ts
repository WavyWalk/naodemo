import {SubscriptionState} from "../libs/statemanagement/SubscriptionState"
import {FormState} from "../libs/formhandling/FormState"
import {Event} from "../models/Event"
import {EventOrganiser} from "../models/EventOrganiser"
import {Category} from "../models/Category"
import {ModelCollection} from "../libs/frontmodel/src"
import {EventContact} from "../models/EventContact"
import {EventValidations} from "../models/validations/EventValidations"
import {Simulate} from "react-dom/test-utils"
import select = Simulate.select
import {AddressValidations} from "../models/validations/AdressValidations"
import {EventDateValidator} from "../models/validations/EventDateValidator"
import {EventSpeaker} from "../models/EventSpeaker"


export class NewEventFormState extends FormState {

    model!: Event

    organiserOpenMode = false
    fieldCategoryOpenMode = false

    fieldCategories?: any[]
    targetAudienceCategories: any[] = []
    plainCategories: any[] = []
    eventContactMode = false
    eventSpeakerMode = false
    async init() {
        this.loadFieldCategories()
        this.targetAudienceCategories = (await Category.indexTargetAudienceCategories()).map(it=>it.serialize())
        this.plainCategories = (await Category.indexPlainCategories()).map(it=>it.serialize())
        this.triggerUpdate()
    }


    validate = () => {
        const event = this.model
        event.resetErrors()
        EventValidations.validateEducationalPoints(event)
        EventValidations.validateMaxAtendees(event)
        EventValidations.validateDescription(event)
        EventValidations.validateTitle(event)
        EventValidations.validateFieldCategories(event)
        EventValidations.validatePlainCategories(event)
        EventValidations.validateTargetAudienceCategories(event)
        EventValidations.validateContact(event)
        EventValidations.validateDatesPresence(event)
        EventValidations.validateEventSpeakerPresense(event)
        EventValidations.validateOrganiserPresence(event)
        EventValidations.validatePrice(event)

        const address = this.model.eventAddress!
        AddressValidations.validateStreetNumber(address)
        AddressValidations.validateStreet(address)
        AddressValidations.validateCity(address)
        AddressValidations.validateCountry(address)
        AddressValidations.validateZipCode(address)

        event.eventDates?.array?.forEach((it)=>{
            EventDateValidator.validateDatePresence(it)
        })

        this.model.validate({retainErrors: true})
    }

    openOrganiserMode = () => {
        this.organiserOpenMode = true
        EventValidations.validateEventSpeakerPresense(this.model)
        this.triggerUpdate()
    }

    setEventContactMode = (value: boolean) => {
        this.eventContactMode = value
        this.triggerUpdate()
    }

    closeOrganiserMode = () => {
        this.organiserOpenMode = false
        this.triggerUpdate()
    }

    setFieldCategoryMode = (value: boolean) => {
        this.fieldCategoryOpenMode = value
        this.triggerUpdate()
    }

    setEventSpeakerMode = (value: boolean) => {
        this.eventSpeakerMode = value
        this.triggerUpdate()
    }

    isOrganiserSelected = () => {
        return !!this.model.eventOrganiser
    }

    selectOrganiserFun = (organiser: EventOrganiser) => {
        this.model.eventOrganiser = organiser
        EventValidations.validateOrganiserPresence(this.model)
        this.closeOrganiserMode()
    }

    async loadFieldCategories() {
        if (!this.fieldCategories) {
            const categories = await Category.indexFieldCategories()
            this.fieldCategories = categories.array.map(it=>it.serialize())
            this.triggerUpdate()
        }
    }

    private addLabelsToCategories = (category: any, selected: Category[]) => {
        category.label = category.name
        category.value = category.id
        const isSelected = selected.find(it=>it.id === category.id)
        category.isDefaultValue = isSelected
        if (category.children) {
            category.children.forEach((it:any)=>{
                this.addLabelsToCategories(it, selected)
            })
        }
    }

    getFieldCategories() {
        const categories = this.fieldCategories ?? []
        categories.forEach((it)=>{
            this.addLabelsToCategories(it, this.model.fieldCategories.array)
        })
        return categories
    }

    getPlainCategories() {
        const categories = this.plainCategories
        categories.forEach((it)=>{
            this.addLabelsToCategories(it, this.model.plainCategories.array)
        })
        return categories
    }

    getTargetAudienceCategories() {
        const categories = this.targetAudienceCategories
        categories.forEach((it)=>{
            this.addLabelsToCategories(it, this.model.targetAudienceCategories.array)
        })
        return categories
    }

    categoryToggleHandler = (value: any, categories: ModelCollection<Category>) => {
        const assigned = categories.array.find(it=>it.id === value.id)
        if (assigned) {
            categories.array = categories.array.filter(it=>it.id !== value.value)
        } else {
            categories.array.push(new Category({
                id: value.id,
                name: value.name
            }))
        }
        this.triggerUpdate()
    }

    onEventContactSubmit = (eventContact: EventContact) => {
        this.model.eventContact = eventContact
        this.setEventContactMode(false)
        EventValidations.validateContact(this.model)
        this.triggerUpdate()
    }

    submit = async () => {
        this.validate()
        if (!this.model.isValid()) {
            this.triggerUpdate()
            return
        }
        await this.model.create()
        this.triggerUpdate()
        console.log(this.model.serialize())
    }

    organiserError = () => {
        return this.model.getFirstErrorFor('eventOrganiser')
    }

    fieldCategoryError = () => {
        return this.model.getFirstErrorFor('fieldCategories')
    }

    targetAudienceError = () => {
        return this.model.getFirstErrorFor('targetAudienceCategories')
    }

    plainCategoriesError = () => {
        return this.model.getFirstErrorFor('plainCategories')
    }

    eventContactError() {
        return this.model.getFirstErrorFor('eventContact')
    }

    datesError() {
        return this.model.getFirstErrorFor('eventDates')
    }

    onEventSpeakerCreated = (eventSpeaker?: EventSpeaker) => {
        if (eventSpeaker) {
            this.model.eventSpeakers.array.push(eventSpeaker)
        }
        EventValidations.validateEventSpeakerPresense(this.model)
        this.setEventSpeakerMode(false)
        this.triggerUpdate()
    }

    onEventSpeakerRemoved = (eventSpeaker: EventSpeaker) => {
        this.model.eventSpeakers.array = this.model.eventSpeakers.array.filter((it)=>{
            return it.lastName !== eventSpeaker.lastName
        })
        EventValidations.validateEventSpeakerPresense(this.model)
        this.triggerUpdate()
    }
}