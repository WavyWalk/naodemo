import * as React from "react"
import {useEffect, useState} from "react"
import {ModelCollection} from "../../libs/frontmodel/src"
import {Event} from '../../models/Event'
import {CurrentUserState} from "../../states/CurrentUserState"
import {Container} from "reactstrap"
import {EventListItemShow} from "./EventListItemShow"

const EventsOfUserIndex = () => {

    const [events, setEvents] = useState<ModelCollection<Event>>(new ModelCollection())
    const [hasNoEvents, setHasNoEvents] = useState(false)

    const loadEvents = async ()=>{
        const eventsToSet = await Event.indexOfUser({wilds: {userId: CurrentUserState.instance.userInstance?.id}})
        if (eventsToSet.array.length < 1) {
            setHasNoEvents(true)
            return
        }
        setEvents(eventsToSet)
    }

    useEffect(()=>{
        loadEvents()
    }, [])


    return <Container className="events-index">
        {hasNoEvents &&
            <p>You did not yet create any events, go ahead</p>
        }
        {events?.array.map((event)=>{
            return <EventListItemShow key={event.id} event={event}/>
        })}
    </Container>

}

export {EventsOfUserIndex}