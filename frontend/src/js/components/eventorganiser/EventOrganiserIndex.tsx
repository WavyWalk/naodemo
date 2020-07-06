import React, {useEffect, useState} from "react"
import {ModelCollection} from "../../libs/frontmodel/src"
import {EventOrganiser} from "../../models/EventOrganiser"
import {Button, Container, Row} from "reactstrap"
import {EventOrganiserListItemShow} from "./EventOrganiserListItemShow"
import {CurrentUserState} from "../../states/CurrentUserState"
import {PrimaryModal} from "../modal/PrimaryModal"
import {EventOrganiserNew} from "./EventOrganiserNew"

const EventOrganiserIndex: React.FC<{
    selectFun: (eventOrganiser: EventOrganiser) => any
}> = ({
    selectFun
}) => {

    const [eventOrganisers, setEventOrganisers] = useState(new ModelCollection<EventOrganiser>())
    const [showNewForm, setShowNewForm] = useState({key: 1, show: false})

    const loadEventOrganisers = async () => {
        const result = await EventOrganiser.indexOfUser({wilds: {userId: CurrentUserState.instance.userInstance?.id}})
        setEventOrganisers(result)
    }

    useEffect(()=>{
        loadEventOrganisers()
    }, [])

    return <Container>
        <EventOrganiserNew
            isActive={showNewForm.show} key={showNewForm.key}
            onCreated={()=>{
                setShowNewForm({key: showNewForm.key, show: false})
                loadEventOrganisers()
            }}
        />
        <Row>
            <Button
                className="apart-button"
                onClick={()=>{
                    const {key} = showNewForm
                    setShowNewForm({key: key+1, show: true})
                }}
            >
                Neuen Veranstalter Einlegen
            </Button>
        </Row>
        <Row>
            {eventOrganisers.map((it)=>{
                return <EventOrganiserListItemShow
                    eventOrganiser={it}
                    key={it.id}
                    selectFun={selectFun}
                />
            })}
        </Row>
    </Container>
}

export {EventOrganiserIndex}