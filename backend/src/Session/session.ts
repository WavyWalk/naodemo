import {User} from "../user/User"
import jwt from 'jsonwebtoken'
import {Request, Response} from "express"

const getSecret = () => {
    return 'SECRETFROMENV'
}

const logIn = async (res: Response, user: User, roleNames: string[]) => {
    const userData = {
        id: user.id!,
        roles: roleNames.map((it)=> {
            return {name: it}
        })
    }
    const token = jwt.sign(
        userData,
        getSecret(),
        {expiresIn: '200 days'}
    )
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 24 * 200)
    })
}

const getCurrentUser = async (req: Request): Promise<User | null> => {
    const token = req.cookies.token
    try {
        const decoded = await new Promise<any>((resolve, reject) => {
            if (!token) {
                reject()
                return
            }
            jwt.verify(token, getSecret(), (err:any, decoded:any) => {
                if (err) {
                    reject()
                    return
                }
                resolve(decoded)
            })
        })
        return new User(decoded)
    } catch (e) {
        return null
    }
}

const logout = (res: Response) => {
    res.cookie('token', null, {
        expires: new Date(0)
    })
}



export const Session = {
    logIn,
    getCurrentUser,
    logout
}