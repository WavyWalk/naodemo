import {EventSpeaker} from "../EventSpeaker"
import {validateNotEmpty} from "./valuevalidations"

export class EventSpeakerValidator {

    static validateFirstName = (speaker: EventSpeaker) => {
        validateNotEmpty(speaker, 'firstName')
    }

    static validateLastName = (speaker: EventSpeaker) => {
        validateNotEmpty(speaker, 'lastName')
    }

    static validateDescription = (speaker: EventSpeaker) => {
        validateNotEmpty(speaker, 'description')
    }

}