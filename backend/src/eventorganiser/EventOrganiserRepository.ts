import {App} from "../App"
import {EventOrganiser} from "./EventOrganiser"
import {ModelCollection} from "../lib/frontmodel/src"

export class EventOrganiserRepository {

    static getOfUser = async (userId: number) => {
        const organisers = await App.prisma.eventOrganiser.findMany({
            where: {
                userId: userId
            }
        })
        return organisers
    }

    static async create(requestOrganiser: any) {
        const {name, phone, website, userId} = requestOrganiser
        const savedOrganiser = await App.prisma.eventOrganiser.create({
            data: {
                name,
                phone,
                website,
                user: {
                    connect: {
                        id: userId
                    }
                }
            } as any
        })
        return savedOrganiser
    }
}