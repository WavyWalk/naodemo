import {EventContact} from "../../models/EventContact"
import React from "react"
import {Card, CardBody} from "reactstrap"

const EventContactShow: React.FC<{
    eventContact: EventContact
}> = ({eventContact}) => {

    return <Card className="event-contact-card">
        <CardBody>
            <p>Name: {eventContact.name}</p>
            <p>E-Mail: {eventContact.email}</p>
            <p>Telefon: {eventContact.phone}</p>
        </CardBody>
    </Card>

}

export {EventContactShow}