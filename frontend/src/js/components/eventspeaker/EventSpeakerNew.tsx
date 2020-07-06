import React, {useMemo} from "react"
import {EventOrganiser} from "../../models/EventOrganiser"
import {NewEventOrganiserFormState} from "../../states/NewEventOrganiserFormState"
import {PrimaryModal} from "../modal/PrimaryModal"
import {PlainInput} from "../formelements/PlainInput"
import {EventOrganiserValidator} from "../../models/validations/EventOrganiserValidator"
import {Button} from "reactstrap"
import {EventSpeaker} from "../../models/EventSpeaker"
import {EventSpeakerNewFormState} from "../../states/EventSpeakerNewFormState"
import {EventSpeakerValidator} from "../../models/validations/EventSpeakerValidator"
import {DropdownSelect} from "../formelements/DropdownSelect"
import {titleSelectPairs} from "../user/UserRoleOrganizerNew"

const EventSpeakerNew: React.FC<{
    onCreated?: (eventSpeaker?: EventSpeaker) => any
    isOpen: boolean
}> = ({
    onCreated,
    isOpen,
}) => {

    const formState = useMemo(() => {
        return new EventSpeakerNewFormState(new EventSpeaker())
    }, []).use()
    const eventSpeaker = formState.model

    return <PrimaryModal
        isOpen={isOpen}
        onClose={() => {
            onCreated?.()
        }}
    >
        <DropdownSelect formState={formState}
            model={eventSpeaker}
            selectPairs={titleSelectPairs}
            label="Titel"
            property="title"
        />
        <PlainInput
            formState={formState}
            model={eventSpeaker}
            label="Vorname"
            property="firstName"
            validate={EventSpeakerValidator.validateFirstName}
        />
        < PlainInput
            formState={formState}
            model={eventSpeaker}
            label="Nachname"
            property="lastName"
            validate={EventSpeakerValidator.validateLastName}
        />
        < PlainInput
            formState={formState}
            model={eventSpeaker}
            label="Info"
            property="description"
            validate={EventSpeakerValidator.validateDescription}
        />
        < Button
            onClick={()=> {
                formState.submit(() => {
                    onCreated?.(eventSpeaker)
                })
            }}
        >
            Erstellen
        </Button>
    </PrimaryModal>
}
export {EventSpeakerNew}