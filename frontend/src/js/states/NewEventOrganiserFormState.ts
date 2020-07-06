import {FormState} from "../libs/formhandling/FormState"
import {EventOrganiser} from "../models/EventOrganiser"
import {EventOrganiserValidator} from "../models/validations/EventOrganiserValidator"

export class NewEventOrganiserFormState extends FormState {

    model!: EventOrganiser

    validate = () => {
        EventOrganiserValidator.validatePhone(this.model)
        EventOrganiserValidator.validateName(this.model)
        EventOrganiserValidator.validateWebsite(this.model)
    }

    submit = async (onSuccess: ()=>any) => {
        this.validate()
        if (!this.model.isValid()) {
            this.triggerUpdate()
            return
        }
        const response = await this.model.create()
        if (!response.isValid()) {
            this.model.mergeWith(response)
            this.triggerUpdate()
            return
        }
        onSuccess()
    }

}