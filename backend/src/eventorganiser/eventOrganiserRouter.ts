import {Router} from "express"
import {handleAsync} from "../lib/handleAsync"
import {Session} from "../Session/session"
import {EventOrganiserRepository} from "./EventOrganiserRepository"

export const eventOrganiserRouter = Router({mergeParams: true})

eventOrganiserRouter.get('/ofUser/:userId', handleAsync(async (req, res)=>{
    const userId = parseInt(req.params.userId)
    const currentUser = await Session.getCurrentUser(req)
    if (userId !== currentUser?.id) {
        res.sendStatus(403)
        return
    }
    const organisers = await EventOrganiserRepository.getOfUser(userId)
    res.send(organisers)
}))

eventOrganiserRouter.post('/create', handleAsync(async (req, res)=>{
    const currentUser = await Session.getCurrentUser(req)
    if (!currentUser || !currentUser.roles!.array.find(it=>it.name === 'ORGANIZER')) {
        res.sendStatus(403)
        return
    }
    const requestOrganiser = req.body
    requestOrganiser.userId = currentUser.id
    const savedOrganiser = await EventOrganiserRepository.create(requestOrganiser)
    res.send(savedOrganiser)
}))