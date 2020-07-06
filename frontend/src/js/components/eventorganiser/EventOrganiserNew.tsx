import React, {useMemo} from "react"
import {EventOrganiser} from "../../models/EventOrganiser"
import {PrimaryModal} from "../modal/PrimaryModal"
import {AccountValidations} from "../../models/validations/AccountValidations"
import {PlainInput} from "../formelements/PlainInput"
import {NewEventOrganiserFormState} from "../../states/NewEventOrganiserFormState"
import {EventOrganiserValidator} from "../../models/validations/EventOrganiserValidator"
import {Button} from "reactstrap"

const EventOrganiserNew: React.FC<{
    onCreated?: (eventOrganiser?: EventOrganiser) => any
    isActive: boolean
}> = ({
    onCreated,
    isActive
}) => {

    const formState = useMemo(()=>{return new NewEventOrganiserFormState(new EventOrganiser())}, []).use()
    const eventOrganiser = formState.model

    return <PrimaryModal
        isOpen={isActive}
        onClose={()=> {
            onCreated?.()
        }}
    >
        <PlainInput formState={formState}
                    model={eventOrganiser}
                    label="Name"
                    property="name"
                    validate={EventOrganiserValidator.validateName}
        />
        <PlainInput formState={formState}
                    model={eventOrganiser}
                    label="Tel. Nummer"
                    property="phone"
                    validate={EventOrganiserValidator.validatePhone}
        />
        <PlainInput formState={formState}
                    model={eventOrganiser}
                    label="Website"
                    property="website"
                    validate={EventOrganiserValidator.validateWebsite}
        />
        <Button
            onClick={()=>{
                formState.submit(()=>{
                    onCreated?.(eventOrganiser)
                })
            }}
        >
            Erstellen
        </Button>
    </PrimaryModal>
}

export {EventOrganiserNew}