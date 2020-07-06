import {Router} from "express"
import {handleAsync} from "../lib/handleAsync"
import {User} from "../user/User"
import {UserRepository} from "../user/UserRepository"
import {Password} from "../security/Password"
import {Session} from "./session"

export const sessionRouter = Router({mergeParams: true})

sessionRouter.post('/login', handleAsync(async (req, res)=>{
    let requestUser = new User(req.body)
    let user = await UserRepository.findByEmail(requestUser.account?.email)
    if (!user) {
        res.send({errors: {general: ['invalid credentials']}})
        return
    }
    const passwordToTest = requestUser.account?.password!
    const actualPassword = user.account?.password!
    const matches = await Password.compare(passwordToTest, actualPassword)
    if (!matches) {
        res.send({errors: {general: ['invalid credentials']}})
        return
    }
    await Session.logIn(res, user, user.roles.array.map(it=>it.name!) ?? [])
    res.send({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles?.map((it)=>{return {name: it.name}})
    })
}))

sessionRouter.delete('/logout', handleAsync(async (req, res)=> {
    const user = await Session.getCurrentUser(req)
    res.send({status: 'ok'})
}))