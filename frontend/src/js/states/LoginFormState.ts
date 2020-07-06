import {FormState} from "../libs/formhandling/FormState"
import {User} from "../models/User"
import {UserValidations} from "../models/validations/UserValidations"
import {AccountValidations} from "../models/validations/AccountValidations"
import {Account} from "../models/Account"
import {CurrentUserState} from "./CurrentUserState"
import {RouterNavigationUtils} from "../utils/routing/RouterNavigationUtils"

export class LoginFormState extends FormState {

    model!: User

    validate = () => {
        const account = this.model.account!
        AccountValidations.validateEmail(account)
        AccountValidations.validatePassword(account)
    }


    login = async () => {
        this.validate()
        if (!this.model.account?.isValid()) {
            this.triggerUpdate()
            return
        }
        const response = await this.model.login()
        if (!response.isValid()) {
            this.model.mergeWith(response)
            this.triggerUpdate()
            return
        }
        CurrentUserState.instance.logUserIn(response)
        RouterNavigationUtils.history.goBack()
    }

}