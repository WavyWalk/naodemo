import { App } from "../App"
import * as fs from 'fs'
import {PROJECT_DIR} from "../index"
import {categoryTypes} from "./Category"

export class CategoryRepository {

    static migrateFixtures = async (filePath: string) => {
        const rawData = fs.readFileSync(filePath, "utf8")
        const categories = JSON.parse(rawData)
        for (let data of categories) {
            await App.prisma.category.create({
                data
            })
        }
    }

    static findAllWithTypeField = async (fieldType: categoryTypes) => {
        return await App.prisma.category.findMany({
            where: {
                type: fieldType
            }
        })
    }

    static async loadForEvent(eventId: number, categoryType: categoryTypes) {
        return await App.prisma.category.findMany({
            where: {
                type: categoryType,
                events: {
                    some: {
                        id: eventId
                    }
                }
            }
        })
    }
}