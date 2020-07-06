import React, {useMemo} from "react"
import {EventOrganiserValidator} from "../../models/validations/EventOrganiserValidator"
import {PlainInput} from "../formelements/PlainInput"
import {NewEventFormState} from "../../states/NewEventFormState"
import {Button, Container} from "reactstrap"
import {PrimaryModal} from "../modal/PrimaryModal"
import {EventOrganiserIndex} from "../eventorganiser/EventOrganiserIndex"
import {Event} from "../../models/Event"
import {TextareaInput} from "../formelements/TextareaInput"
import {Category} from "../../models/Category"
import {TreeSelect} from "../formelements/TreeSelect"
import {ModelCollection} from "../../libs/frontmodel/src"
import {EventDateIndexEdit} from "../eventdate/EventDateIndexEdit"
import {EventAddress} from "../../models/EventAddress"
import {EventContactNew} from "../eventcontact/EventContactNew"
import {EventContactShow} from "../eventcontact/EventContactShow"
import {EventValidations} from "../../models/validations/EventValidations"
import {AddressValidations} from "../../models/validations/AdressValidations"
import {EventSpeakerCardShow} from "../eventspeaker/EventSpeakerCardShow"
import {EventSpeakerNew} from "../eventspeaker/EventSpeakerNew"

const EventNew: React.FC = () => {

    const formState = useMemo(
        ()=> {
            return new NewEventFormState(new Event({
                eventAddress: new EventAddress()
            }))
        },
        []
    ).use()

    const event = formState.model
    const address = event.eventAddress

    return <Container fluid className="event-new">
        <h3 className="text-center">
            Fill in and submit to create event
        </h3>
        <PlainInput
            formState={formState}
            model={event}
            label="Name"
            property="title"
            validate={EventValidations.validateTitle}
        />
        <TextareaInput
            formState={formState}
            model={event}
            label="Beschreibung"
            property="description"
            validate={EventValidations.validateDescription}
        />
        <TextareaInput
            formState={formState}
            model={event}
            label="Weitere Informationen"
            property="additionalInformation"
        />
        <div className="numeric-input-group">
            <PlainInput
                formState={formState}
                model={event}
                label="Maximale Teilnehmerzahl"
                property="maxAtendees"
                validate={EventValidations.validateMaxAtendees}
            />
            <PlainInput
                formState={formState}
                model={event}
                label="Fortbildungspunkte"
                property="educationalPoints"
                validate={EventValidations.validateEducationalPoints}
            />
            <PlainInput
                formState={formState}
                model={event}
                label="Preis"
                property="price"
                validate={EventValidations.validatePrice}
            />
        </div>
        <div>
        <div className="form-block">
            {formState.organiserOpenMode
                && <PrimaryModal
                    isOpen={true}
                    onClose={()=>{
                        formState.closeOrganiserMode()
                        EventValidations.validateOrganiserPresence(event)
                    }}
                >
                    <EventOrganiserIndex selectFun={formState.selectOrganiserFun}/>
                </PrimaryModal>
            }
            <h3>Veranstaler:</h3>
            {formState.organiserError() &&
                <p className="isInvalid">
                    {formState.organiserError()}
                </p>
            }
            {formState.isOrganiserSelected() &&
                <p>{event.eventOrganiser?.name}</p>
            }
            <div>
                <Button
                    onClick={()=>{
                        formState.openOrganiserMode()
                    }}
                >
                    {formState.isOrganiserSelected()
                        ? `select another`
                        : `select`
                    }
                </Button>
            </div>
        </div>
        </div>
        <div className="form-block">
            <h3>Fachgebiete</h3>
            {formState.fieldCategoryError()
                && <p className="isInvalid">{formState.fieldCategoryError()}</p>
            }
            <TreeSelect
                formState={formState}
                model={event}
                label="Fachgebiete"
                data={formState.getFieldCategories()}
                property="fieldCategories"
                onChange={(value)=>{
                    formState.categoryToggleHandler(value, event.fieldCategories)
                }}
                validate={()=>EventValidations.validateFieldCategories(event)}
            />
        </div>
        <div className="form-block">
            <h3>Zielgruppen</h3>
            {formState.targetAudienceError()
            && <p className="isInvalid">{formState.targetAudienceError()}</p>
            }
            <TreeSelect
                formState={formState}
                model={event}
                label="Zielgruppen"
                data={formState.getTargetAudienceCategories()}
                property="targetAudienceCategories"
                onChange={(value)=>{
                    formState.categoryToggleHandler(value, event.targetAudienceCategories)
                }}
                validate={()=>EventValidations.validateTargetAudienceCategories(event)}
            />
        </div>
        <div className="form-block">
            <h3>Kategorien</h3>
            {formState.plainCategoriesError()
            && <p className="isInvalid">{formState.plainCategoriesError()}</p>
            }
            <TreeSelect
                formState={formState}
                model={event}
                label="Kategorien"
                data={formState.getPlainCategories()}
                property="plainCategories"
                onChange={(value)=>{
                    formState.categoryToggleHandler(value, event.plainCategories)
                }}
                validate={()=>EventValidations.validatePlainCategories(event)}
            />
        </div>
        <EventDateIndexEdit
            formState={formState}
            event={event}
            onChange={()=>EventValidations.validateDatesPresence(event)}
            eventDatesPresenceError={event.getFirstErrorFor('eventDates')}
        />
        <div className="form-block">
            <h3>Adresse</h3>
            <PlainInput
                formState={formState}
                model={address}
                label="Land"
                property="country"
                validate={AddressValidations.validateCountry}
            />
            <PlainInput
                formState={formState}
                model={address}
                label="Stadt"
                property="city"
                validate={AddressValidations.validateCity}
            />
            <PlainInput
                formState={formState}
                model={address}
                label="Straße"
                property="street"
                validate={AddressValidations.validateStreet}
            />
            <PlainInput
                formState={formState}
                model={address}
                label="Nummer"
                property="streetNumber"
                validate={AddressValidations.validateStreetNumber}
            />
            <PlainInput
                formState={formState}
                model={address}
                label="PLZ"
                property="zipCode"
                validate={AddressValidations.validateZipCode}
            />
        </div>
        <div className="form-block">
            <h3>Ansprechpartner</h3>
            {formState.eventContactError()
            && <p className="isInvalid">
                {formState.eventContactError()}
            </p>
            }
            {event.eventContact &&
                <EventContactShow eventContact={event.eventContact}/>
            }
            <EventContactNew
                isOpen={formState.eventContactMode}
                onClose={()=>formState.setEventContactMode(false)}
                onSubmit={formState.onEventContactSubmit}
            />
            <div>
                <Button
                    onClick={()=>{
                        formState.setEventContactMode(true)
                    }}
                >
                    {event.eventContact
                        ? 'Ersetzen'
                        : 'Hunzufügen'
                    }
                </Button>
            </div>
        </div>
        <div className="form-block">
            <h3>Referenten</h3>
            {formState.model.getFirstErrorFor('eventSpeakers')
            && <p className="isInvalid">
                {formState.model.getFirstErrorFor('eventSpeakers')}
            </p>
            }
            <div className="speaker-cards">
                {event.eventSpeakers?.map((eventSpeaker)=>{
                    return <EventSpeakerCardShow
                        key={eventSpeaker.getReactKey()}
                        eventSpeaker={eventSpeaker}
                        onRemove={formState.onEventSpeakerRemoved}
                    />
                })}
            </div>
            {formState.eventSpeakerMode
            && <EventSpeakerNew
                isOpen={formState.eventSpeakerMode}
                onCreated={formState.onEventSpeakerCreated}
            />
            }
            <Button
                onClick={()=>{
                    formState.setEventSpeakerMode(true)
                }}
            >
                Hunzufügen
            </Button>
        </div>
        <Button
            onClick={()=>{
                formState.submit()
            }}
        >
            Submit
        </Button>
    </Container>
}

export {EventNew}