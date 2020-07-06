import {EventContact} from "../../models/EventContact"
import React from "react"
import {Button, Card, CardBody} from "reactstrap"
import {EventSpeaker} from "../../models/EventSpeaker"

const EventSpeakerCardShow: React.FC<{
    eventSpeaker: EventSpeaker
    onRemove: (eventSpeaker: EventSpeaker)=>any
}> = ({eventSpeaker, onRemove}) => {


    return <Card className="speaker-card">
        <CardBody>
            <p>title: {eventSpeaker.title}</p>
            <p>first name:  {eventSpeaker.firstName}</p>
            <p>last name: {eventSpeaker.lastName}</p>
            <p>description: {eventSpeaker.description}</p>
            <Button
                className="apart-button"
                onClick={()=>{
                    onRemove(eventSpeaker)
                }}
            >
                Remove
            </Button>
        </CardBody>
    </Card>

}

export {EventSpeakerCardShow}