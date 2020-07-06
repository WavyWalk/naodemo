import {App} from "../App"
import {Password} from "../security/Password"
import {User} from "./User"

export class UserRepository {

    static async createUserRegister(user: User, role: {id: number}) {
        const result = await App.prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                tosAccepted: user.tosAccepted,
                newsletterAccepted: user.newsletterAccepted,
                title: user.title,
                salutation: user.salutation,
                account: {
                    create: {
                        password: await Password.hashPassword(user.account?.password!),
                        email: user.account?.email,
                    }
                },
                roles: {
                    connect: {
                        id: role.id
                    }
                }
            },
            include: {
                account: true,
                roles: true
            }
        })
        return new User(result)
    }

    static findByEmail = async (email?: string): Promise<User | null> => {
        if (!email) {
            return null
        }
        const users = await App.prisma.user.findMany({
            where: {
                account: {
                    email
                }
            },
            include: {
                roles: true,
                account: true
            }
        })
        const userData = users[0]
        if (!userData) {
            return null
        }
        return new User(userData)
    }

}