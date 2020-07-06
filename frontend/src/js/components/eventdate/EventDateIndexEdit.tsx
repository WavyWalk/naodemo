import React, {useState} from "react"
import {NewEventFormState} from "../../states/NewEventFormState"
import {Event} from "../../models/Event"
import {fromUnixTime, getUnixTime, parse} from 'date-fns'
import {DateSelect} from "../formelements/DateSelect"
import {EventDate} from "../../models/EventDate"
import {Button} from "reactstrap"
import {EventValidations} from "../../models/validations/EventValidations"

const EventDateIndexEdit: React.FC<{
    formState: NewEventFormState,
    event: Event,
    onChange: ()=>any
    eventDatesPresenceError?: string
}> = ({
    formState,
    event,
    onChange,
    eventDatesPresenceError
}) => {

    formState.use()

    const existing = event.eventDates
    const [showTimeInput, setShowTimeInput] = useState(true)
    const [currentModel, setCurrentModel] = useState(new EventDate())
    const [showAdd, setShowAdd] = useState(false)
    const [invalidInput, setInvalidInput] = useState(false)

    return <div className="form-block">
        <h3>Termine</h3>
        <div>
            {existing.map((it)=>{
                return <div>
                    <DateSelect
                        key={it.getReactKey()}
                        formState={formState}
                        model={it}
                        label=""
                        property="date"
                        onChange={(date)=>{
                        }}
                    />
                    <button
                        onClick={()=>{
                            event.eventDates.array = event.eventDates.array.filter((eventDate)=> {
                                return it.getReactKey() !== eventDate.getReactKey()
                            })
                            formState.triggerUpdate()
                        }}
                    >
                        remove
                    </button>
                </div>
            })}
        </div>
        <div className="mr-1">
            {eventDatesPresenceError
            && <p className="isInvalid">
                {eventDatesPresenceError}
            </p>
            }
            <Button
                className="apart-button"
                onClick={() => {
                    event.eventDates.array.push(new EventDate({date: new Date()}))
                    onChange()
                    formState.triggerUpdate()
                }}
            >
                {event.eventDates.array.length > 0
                    ? 'Add another'
                    : 'Add'
                }
            </Button>
        </div>
    </div>
}

export {EventDateIndexEdit}