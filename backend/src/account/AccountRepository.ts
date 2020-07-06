import {App} from "../App"

export class AccountRepository {

    static async emailExists(email: string) {
        const existing = await App.prisma.account.findMany({
            where: {
                email
            },
            select: {
                id: true
            }
        })
        return existing.length > 0
    }

}