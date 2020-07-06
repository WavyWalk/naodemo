import {EventContact} from "../EventContact"
import {validateEmail, validateNotEmpty, validatePhoneNumber} from "./valuevalidations"

export class EventContactValidator {

    static validateName = (contact: EventContact) => {
        validateNotEmpty(contact, 'name')
    }

    static validatePhone = (contact: EventContact) => {
        validatePhoneNumber(contact, 'phone')
    }

    static validateEmail = (contact: EventContact) => {
        validateEmail(contact, 'email')
    }

}