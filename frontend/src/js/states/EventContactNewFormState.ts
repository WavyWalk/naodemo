import {FormState} from "../libs/formhandling/FormState"
import {EventContact} from "../models/EventContact"
import {EventContactValidator} from "../models/validations/EventContactValidator"

export class EventContactNewFormState extends FormState {

    model!: EventContact

    validate = () => {
        const contact = this.model
        EventContactValidator.validateName(contact)
        EventContactValidator.validatePhone(contact)
        EventContactValidator.validateEmail(contact)
    }

    submit(onSubmit: (contact: EventContact) => any) {
        this.validate()
        if (!this.model.isValid()) {
            this.triggerUpdate()
            return
        }
        onSubmit(this.model)
    }
}