import {FormState} from "../libs/formhandling/FormState"
import {EventOrganiser} from "../models/EventOrganiser"
import {EventOrganiserValidator} from "../models/validations/EventOrganiserValidator"
import {EventSpeaker} from "../models/EventSpeaker"
import {EventSpeakerValidator} from "../models/validations/EventSpeakerValidator"

export class EventSpeakerNewFormState extends FormState {

    model!: EventSpeaker

    validate = () => {
        const speaker = this.model
        EventSpeakerValidator.validateLastName(speaker)
        EventSpeakerValidator.validateFirstName(speaker)
        EventSpeakerValidator.validateDescription(speaker)
    }

    submit = async (onSuccess: ()=>any) => {
        this.validate()
        if (!this.model.isValid()) {
            this.triggerUpdate()
            return
        }
        onSuccess()
    }

}