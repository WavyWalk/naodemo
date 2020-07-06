import React from "react"
import {Card, Col, Media, Row, Tooltip, UncontrolledTooltip} from "reactstrap"
import {Event} from "../../models/Event"
import {format, parseISO} from "date-fns"
import {Link} from "react-router-dom"
import deLocale from 'date-fns/locale/de'

const EventListItemShow: React.FC<{ event: Event }> = ({event}) => {

    const firstDateObject = event.eventDates?.array[0]?.date as any

    const parseAndFormatDate = (dateObject: any) => {
        try {
            return format(parseISO(dateObject), "EEEE, eo MMM, yyyy", {locale: deLocale})
        } catch (e) {
            return ''
        }
    }

    let firstDate = ''
    try {
        if (firstDateObject) {
            firstDate = parseAndFormatDate(firstDateObject)
        }
    } catch (e) {}

    const getRestDates = () => {
        return event.eventDates.array.slice(1, event.eventDates.array.length).map(it=>parseAndFormatDate(it.date))
    }

    const extraDatesCount = event.eventDates.array.slice(1, event.eventDates.array.length).length

    return <Row className="event-list-item-show">
        <Col lg={1} className="event-list-item">
            <div className="list-image">
                <img src="/public/assets/img/rickroll.jpg" className="img-thumbnail"/>
            </div>
        </Col>
        <Col lg={5} className="event-list-left">
            <div className="centerY">
                <Link to={`/event/${event.id}`}>
                    <h3 className="event-title">{event.title}</h3>
                </Link>
                <p>Von: <a href={event.eventOrganiser?.website}>{event.eventOrganiser?.name}</a></p>
                <p>{firstDate} {event.eventAddress?.city}
                    {extraDatesCount > 0 &&
                        <>
                            <span className="extra-dates" id={`eventdate${event.id}`}>+{extraDatesCount}</span>
                            <UncontrolledTooltip placement="right" target={`eventdate${event.id}`}>
                               {getRestDates().join('; ')}
                            </UncontrolledTooltip>
                        </>
                    }
                </p>
            </div>
        </Col>
        <Col lg={6} className="event-right">
            <Row className="centerY">
                <div className="categories-list">
                    <p>Fachgebiet: {event.fieldCategories.array.map((it)=>
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
            </Row>
            <Row>
                <Col lg={6} className="speakers-list">
                    <p>{event.eventSpeakers.array.length} Referent</p>
                    {event.eventSpeakers.map((it)=>{
                        return <span className="speaker-token" key={it.id}>
                            {it.firstName} {it.lastName}
                        </span>
                    })}
                </Col>
                <Col lg={6} className="event-list-price">
                    {event.price} €
                </Col>
            </Row>
        </Col>
    </Row>

}

export {EventListItemShow}