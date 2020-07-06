import React from "react"
import {Nav, Row, NavItem, Button} from "reactstrap"
import {Link, useRouteMatch} from "react-router-dom"
import {EventsOfUserIndex} from "./eventsOfUserIndex"

const EventOfOrganizerIndex = () => {

    const match = useRouteMatch()

    return <div>
        <Row>
            <Nav className="dashboard-nav">
                <NavItem className="dashboard-nav-item">
                    <Link to={`${match.path}/new`}>
                        <Button>
                            Neue Veranstaltung erstellen
                        </Button>
                    </Link>
                </NavItem>
            </Nav>
        </Row>
        <Row>
            <EventsOfUserIndex/>
        </Row>
    </div>

}

export {EventOfOrganizerIndex}