import {EventDate} from "../EventDate"
import {validateIsDateTime} from "./valuevalidations"

export class EventDateValidator {

    static validateDatePresence = (date: EventDate) => {
        validateIsDateTime(date, 'date')
    }

}