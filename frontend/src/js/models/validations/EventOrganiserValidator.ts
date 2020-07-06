import {EventOrganiser} from "../EventOrganiser"
import {validateNotEmpty, validatePhoneNumber, validateWebsiteAddress} from "./valuevalidations"

export class EventOrganiserValidator {

    static validateName = (eventOrganiser: EventOrganiser) => {
        validateNotEmpty(eventOrganiser, 'name')
    }

    static validatePhone = (eventOrganiser: EventOrganiser) => {
        validatePhoneNumber(eventOrganiser, 'phone')
    }

    static validateWebsite = (eventOrganiser: EventOrganiser) => {
        validateWebsiteAddress(eventOrganiser, 'website')
    }

}