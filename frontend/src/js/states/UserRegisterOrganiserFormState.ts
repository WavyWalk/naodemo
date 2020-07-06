import { FormState } from "../libs/formhandling/FormState";
import {User} from "../models/User"
import {validateNotEmpty, validateSameValue} from "../models/validations/valuevalidations"
import {CurrentUserState} from "./CurrentUserState"
import {RouterNavigationUtils} from "../utils/routing/RouterNavigationUtils"

export class UserRegisterOrganiserFormState extends FormState {

    model!: User

    validate = () => {
        this.validateEmail()
        this.validatePassword()
        this.validatePasswordConfirmation()
        this.validateFirstName()
        this.validateLastName()
        this.validateSalutation()
        this.validateTosAccepted()
    }

    validateEmail = () => {
        validateNotEmpty(this.model.account, 'email')
    }

    validatePassword = () => {
        validateNotEmpty(this.model.account, 'password')
    }

    validatePasswordConfirmation = () => {
        if (this.model.account?.password) {
            return
        }
        validateSameValue(this.model.account, 'passwordConfirmation', this.model.account?.password)
    }

    validateFirstName = () => {
        validateNotEmpty(this.model, 'firstName')
    }

    validateLastName = () => {
        validateNotEmpty(this.model, 'lastName')
    }

    validateSalutation = () => {
        validateNotEmpty(this.model, 'salutation')
    }

    validateTosAccepted = () => {
        validateNotEmpty(this.model, 'tosAccepted')
    }

    async submit() {
        this.model.resetErrors()
        this.validate()
        if (!this.model.isValid() || !this.model.account?.isValid()) {
            this.triggerUpdate()
            return
        }
        const response = await this.model.createOrganizer()
        if (!response.isValid()) {
            this.model.addErrorFor('general', ...(response.getErrorsFor('general') ?? []))
            this.triggerUpdate()
            return
        }
        CurrentUserState.instance.logUserIn(response)
        RouterNavigationUtils.history.goBack()
    }
}