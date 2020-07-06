import {Router} from "express"
import {handleAsync} from "../lib/handleAsync"
import {Event} from "./Event"
import {EventRepository} from "./EventRepository"
import {AlgoliaConnection} from "../algolia/AlgoliaConnection"
import {EventsAlgoliaIndexer} from "./EventsAlgoliaIndexer"
import {Session} from "../Session/session"

export const eventRouter = Router({mergeParams: true})

eventRouter.post('/create', handleAsync(async (req, res)=>{
    const currentUser = await Session.getCurrentUser(req)
    if (!currentUser || !currentUser.roles!.array.find(it=>it.name === 'ORGANIZER')) {
        res.sendStatus(403)
        return
    }
    const requestEvent = new Event(req.body)
    const result = await EventRepository.create(requestEvent)
    const persistedEvent = await EventRepository.getById(result.id)
    res.send(result)
    await EventsAlgoliaIndexer.run([persistedEvent])
}))

eventRouter.get('/ofUser/:userId', handleAsync(async (req, res)=>{
    const currentUser = await Session.getCurrentUser(req)
    if (!currentUser || !currentUser.roles!.array.find(it=>it.name === 'ORGANIZER')) {
        res.sendStatus(403)
        return
    }
    const userId = parseInt(req.params.userId)
    if (currentUser.id !== userId) {
        res.sendStatus(403)
        return
    }
    const events = await EventRepository.findByUserOrganisers(userId)
    res.send(events)
}))

eventRouter.get('/:eventId', handleAsync(async (req, res)=>{
    const eventId = parseInt(req.params.eventId)
    const event = await EventRepository.getById(eventId)
    if (!event) {
        res.sendStatus(404)
        return
    }
    res.send(event)
}))
