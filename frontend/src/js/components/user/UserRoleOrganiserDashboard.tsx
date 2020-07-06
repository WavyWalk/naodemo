import React from "react"
import {Container, Nav, NavItem, Row} from "reactstrap"
import {Route, Switch, useRouteMatch} from "react-router"
import {NavLink} from "react-router-dom"
import {EventOrganiserIndex} from "../eventorganiser/EventOrganiserIndex"
import {EventOfOrganizerIndex} from "../event/EventOfOrganiserIndex"
import {EventNew} from "../event/EventNew"

const UserRoleOrganizerDashboard: React.FC = () => {

    const match = useRouteMatch()

    return <Container>
        <Switch>
            <Route exact path={`${match.path}/events`}>
                <EventOfOrganizerIndex/>
            </Route>
            <Route exact path={`${match.path}/events/new`}>
                <EventNew/>
            </Route>
        </Switch>
    </Container>
}

export {UserRoleOrganizerDashboard}