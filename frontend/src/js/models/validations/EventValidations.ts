import {validateModelCollectionNotEmpty, validateNotEmpty, validateNumeric} from "./valuevalidations"
import {Event} from "../Event"

export class EventValidations {

    static validateTitle = (event: Event) => {
        validateNotEmpty(event, 'title')
    }

    static validateDescription = (event: Event) => {
        validateNotEmpty(event, 'description')
    }

    static validateMaxAtendees = (event: Event) => {
        validateNumeric(event, 'maxAtendees')
    }

    static validateEducationalPoints = (event: Event) => {
        validateNumeric(event, 'educationalPoints')
    }

    static validateOrganiserPresence = (event: Event) => {
        validateNotEmpty(event, 'eventOrganiser', 'Muss hizugefügt werden')
    }

    static validateFieldCategories = (event: Event) => {
        validateModelCollectionNotEmpty(
            event, 'fieldCategories',
            'Mindestens ein Fachgebiet muss hinzugefügt werden '
        )
    }

    static validateTargetAudienceCategories = (event: Event) => {
        validateModelCollectionNotEmpty(
            event, 'targetAudienceCategories',
            'Mindestens eine Zielgruppe muss hinzugefügt werden '
        )
    }

    static validatePlainCategories = (event: Event) => {
        validateModelCollectionNotEmpty(
            event, 'plainCategories',
            'Mindestens eine Kategorie muss hinzugefügt werden '
        )
    }

    static validateDatesPresence = (event: Event) => {
        validateModelCollectionNotEmpty(
            event, 'eventDates',
            'Mindestens ein Termin muss hinzugefügt werden'
        )
    }

    static validateContact = (event: Event) => {
        validateNotEmpty(event, 'eventContact', 'Muss hizugefügt werden')
    }

    static validateEventSpeakerPresense = (event: Event) => {
        validateModelCollectionNotEmpty(event, 'eventSpeakers')
    }

    static validatePrice = (event: Event) => {
        validateNumeric(event, 'price')
    }



}