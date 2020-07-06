import {PrimaryModal} from "../modal/PrimaryModal"
import React, {useMemo} from "react"
import {NewEventFormState} from "../../states/NewEventFormState"
import {EventContact} from "../../models/EventContact"
import {EventOrganiserValidator} from "../../models/validations/EventOrganiserValidator"
import {PlainInput} from "../formelements/PlainInput"
import {EventContactNewFormState} from "../../states/EventContactNewFormState"
import {Button} from "reactstrap"
import {EventContactShow} from "./EventContactShow"
import {EventContactValidator} from "../../models/validations/EventContactValidator"

const EventContactNew: React.FC<{
    isOpen: boolean
    onClose: ()=>any
    onSubmit: (contact: EventContact) => any
}> = ({
    isOpen,
    onClose,
    onSubmit
}) => {

    const formState = useMemo(()=>new EventContactNewFormState(new EventContact()),[]).use()
    const contact = formState.model

    return <PrimaryModal
        isOpen={isOpen}
        onClose={onClose}
    >
        <PlainInput
            formState={formState}
            model={contact}
            label="vollständiger Name"
            property="name"
            validate={EventContactValidator.validateName}
        />
        <PlainInput
            formState={formState}
            model={contact}
            label="Telefonnummer"
            property="phone"
            validate={EventContactValidator.validatePhone}
        />
        <PlainInput
            formState={formState}
            model={contact}
            label="E-Mail"
            property="email"
            validate={EventContactValidator.validateEmail}
        />
        <Button
            onClick={()=>{
                formState.submit(onSubmit)
            }}
        >
            Ok
        </Button>
    </PrimaryModal>
}

export {EventContactNew}