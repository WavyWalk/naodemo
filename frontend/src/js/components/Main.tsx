import React from "react"
import { Container } from "reactstrap"
import { TopMenu } from "./menu/TopMenu"
import { Switch, Route } from "react-router"
import { UserRoleOrganizerNew } from "./user/UserRoleOrganizerNew"
import {LoginForm} from "./session/LoginForm"
import {UserRoleOrganizerDashboard} from "./user/UserRoleOrganiserDashboard"
import {EventShow} from "./event/EventShow"
import {EventGlobalSearch} from "./event/EventGlobalSearch"
import {AboutDemo} from "./pages/AboutDemo"

const Main = () => {

    return <Container fluid>
        <TopMenu/>
        <Container fluid>
            <Switch>
                <Route exact path={'/'}>
                    <EventGlobalSearch/>
                </Route>
                <Route exact path={`/aboutDemo`}>
                    <AboutDemo/>
                </Route>
                <Route exact path={'/user/registerOrganizer'}>
                    <UserRoleOrganizerNew
                        open={true}
                    />
                </Route>
                <Route exact path={'/login'}>
                    <LoginForm/>
                </Route>
                <Route path={`/user/roleOrganiser/dashboard`}>
                    <UserRoleOrganizerDashboard/>
                </Route>
                <Route exact path={`/event/search`}>
                    <EventGlobalSearch/>
                </Route>
                <Route exact path={`/event/:eventId`} render={(props)=>{
                    const eventId = props.match.params.eventId
                    return <EventShow key={eventId} eventId={eventId}/>
                }}/>
            </Switch>
        </Container>
    </Container>

}

export {Main}