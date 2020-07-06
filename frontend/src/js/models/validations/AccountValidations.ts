import {validateNotEmpty, validateSameValue} from "./valuevalidations"
import {Account} from "../Account"


export class AccountValidations {

    static validateEmail = (account: Account) => {
        validateNotEmpty(account, 'email')
    }

    static validatePassword = (account: Account) => {
        validateNotEmpty(account, 'password')
    }

    static validatePasswordConfirmation = (account: Account) => {
        if (account?.password) {
            return
        }
        validateSameValue(account, 'passwordConfirmation', account?.password)
    }

}