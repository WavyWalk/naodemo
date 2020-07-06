import {validateNotEmpty, validateSameValue} from "./valuevalidations"
import {User} from "../User"


export class UserValidations {

    static validateFirstName = (user: User) => {
        validateNotEmpty(user, 'firstName')
    }

    validateLastName = (user: User) => {
        validateNotEmpty(user, 'lastName')
    }

    validateSalutation = (user: User) => {
        validateNotEmpty(user, 'salutation')
    }
    
    validateTosAccepted = (user: User) => {
        validateNotEmpty(user, 'tosAccepted')
    }
}