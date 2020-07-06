import React, {useEffect, useState} from "react"
import {Event} from "../../models/Event"
import {Col, Container, Row} from "reactstrap"
import {parseISO, format} from "date-fns"
import {Link} from "react-router-dom"


const EventShow: React.FC<{
    eventId: any
}> = ({eventId}) => {

    const [event, setEvent] = useState<Event>()

    const loadEvent = async () => {
        const event = await Event.show({wilds: {eventId: eventId}})
        console.log(event.serialize())
        setEvent(event)
    }

    useEffect(()=>{
        loadEvent()
    },[])

    if (!event) {
        return <p>Loading...</p>
    }

    return <Container className="event-show">
        <Row className="organizer event-list-left event-show-head">
            <Col lg={2} className="event-show-img">
                <img src="/public/assets/img/rickroll.jpg"/>
            </Col>
            <Col lg={7} className="trimText text">
                <div>
                    <p className="event-title">Von: <a href={event.eventOrganiser?.website}>{event.eventOrganiser?.name}</a></p>
                    <div className="categories-list">
                        <p className="category-with-tokens text trimText">
                            Fachgebiet:
                            {event.fieldCategories.array.map((it)=>
                                <span className="category-name-in-list">
                                    {it.name}
                                </span>
                            )}
                        </p>
                        <p>Zielgruppe: {event.targetAudienceCategories.array.map((it)=>
                            <span className="category-name-in-list">
                                {it.name}
                            </span>
                        )}
                        </p>
                        <p>Kategorie: {event.plainCategories.array.map((it)=>
                            <span className="category-name-in-list">
                                {it.name}
                            </span>
                        )}
                        </p>
                    </div>
                </div>
            </Col>
            <Col lg={3}>
                <p>{event.educationalPoints} Fortbildungspunkte</p>
                <p>Noch {event.maxAtendees} Plätze Verfugbar</p>
                <p>{event.price} € inkl. 16% MwSt.</p>
            </Col>
        </Row>
        <Row>
            <Col lg={8} className="event-show-body">
                <div className="event-text-box">
                    <h3>Veranstaltungsinhalt</h3>
                    <h1>{event.title}</h1>
                    <div>
                        {event.description}
                    </div>
                </div>
                <div className="speakers-list">
                    <h2>Referenten:</h2>
                    {event.eventSpeakers.array.map((it)=>{
                        return <div key={it.id} className="event-speaker">
                            <span className="speaker-token" key={it.id}>
                                {it.firstName?.[0]} {it.lastName?.[1]}
                            </span>
                            <p>{it.title ?? `${it.title} `}{it.firstName} {it.lastName}</p>
                            <p>{it.description}</p>
                        </div>
                    })}
                </div>
            </Col>
            <Col lg={4} className="event-show-sidebar">
                <div className="event-dates">
                    <h3>Termin</h3>
                    {event.eventDates.map((it)=>{
                        return <p key={it.date}>{it.date && (format(parseISO(it.date as any), "dd.MM.yyyy HH:mm"))}</p>
                    })}
                </div>
                <div className="event-place">
                    <h3>Veranstaltungsort</h3>
                    <p>{event.eventAddress?.street} {event.eventAddress?.streetNumber}</p>
                    <p>{event.eventAddress?.zipCode} {event.eventAddress?.city}, {event.eventAddress?.country}</p>
                </div>
                <div>
                    <h3>Veranstalter</h3>
                    <p>{event.eventOrganiser?.name}</p>
                    <p>{event.eventOrganiser?.website}</p>
                </div>
                <div>
                    <h3>Kontakt</h3>
                    <p>{event.eventContact?.name}</p>
                    <p>{event.eventContact?.phone}</p>
                    <p>{event.eventContact?.email}</p>
                </div>
                <div>
                    <h3>Organisatorisches</h3>
                    <p>Max. Teilnehmerzahl: {event.maxAtendees}</p>
                    <p>Veranstaltungs id: {event.eventId} </p>
                </div>
            </Col>
        </Row>
    </Container>

}

export {EventShow}