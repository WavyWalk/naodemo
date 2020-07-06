import React from "react"
import {EventOrganiser} from "../../models/EventOrganiser"
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap"

const EventOrganiserListItemShow: React.FC<{
    eventOrganiser: EventOrganiser
    selectFun: (eventOrganizer: EventOrganiser) => any
}> = ({eventOrganiser, selectFun}) => {

    return <div>
        <Card className="list-item-card">
            <CardBody>
                <CardTitle>
                    Name: {eventOrganiser.name}
                </CardTitle>
                <div>
                    <p>webSite: {eventOrganiser.website}</p>
                    <p>phone: {eventOrganiser.phone}</p>
                </div>
                <Button
                    className="apart-button"
                    onClick={()=> {
                        selectFun(eventOrganiser)
                    }}
                >
                    Diesen Veranstalter auswählen
                </Button>
            </CardBody>
        </Card>
    </div>
}

export {EventOrganiserListItemShow}