import {Router} from 'express'
import {handleAsync} from "../lib/handleAsync"
import {App} from "../App"
import {Password} from "../security/Password"
import { UserSelect, AccountSelect } from '@prisma/client'
import {User} from "./User"
import {AccountRepository} from "../account/AccountRepository"
import {UserRepository} from "./UserRepository"
import {Session} from "../Session/session"

export const userRouter = Router({mergeParams: true})

userRouter.post('/registration/organiser', handleAsync(async (req, res)=>{
    let user = new User(req.body)
    const roles = await App.prisma.role.findMany({
        where: {
            name: 'ORGANIZER'
        }
    })
    const role = roles[0]!
    let emailExists = await AccountRepository.emailExists(user.account?.email!)
    if (emailExists) {
        let errors = {errors: {general: ['email already exists']}}
        res.send(errors)
        return
    }
    const createdUser = await UserRepository.createUserRegister(user, role)
    await Session.logIn(res, createdUser, createdUser.roles.array.map(it=>it.name!) ?? [])
    res.send({
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        roles: createdUser.roles?.map((it)=>{return {name: it.name}})
    })
    res.send(createdUser)
}))
