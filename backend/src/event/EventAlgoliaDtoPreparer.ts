import {CategoryCache} from "../category/CategoryCache"
import {parseISO, getUnixTime} from 'date-fns'

interface ICategory {
    id: number,
    name: string,
    parentId: number
    parent: ICategory
}

interface ICategoryLevelAccumulator {
    [id: string]: {[id:string]: boolean}
}

export class EventAlgoliaDtoPreparer {

    static async make(event: any) {
        const fieldCategories = event.fieldCategories
        if (fieldCategories) {
            const hierarchical = await this.prepareCategoriesHierarchy(event.fieldCategories)
            Object.keys(hierarchical).forEach((it)=>{
                event[it] = hierarchical[it]
            })
        }
        const dates = event.eventDates
        event.eventDates = dates.map((it: any)=>{
            if (it.date) {
                it.dateTimestamp = getUnixTime(it.date)
            }
            return it
        })

        event.description = event.description?.substr(0, 240)

        return event
    }

    private static async prepareCategoriesHierarchy(fieldCategories: ICategory[]) {
        let result: ICategoryLevelAccumulator = {}
        const idMap = await CategoryCache.getMappedByIdWithParents()
        fieldCategories.forEach((it)=>{
            const category = idMap[it.id] as ICategory
            result = this.makeCategoryLevels(result, category)
        })
        const toReturn: any = {}
        Object.keys(result).forEach((key)=>{
            const categoryNames = result[key]
            toReturn[`field.${key}`] = Object.keys(categoryNames)
        })
        return toReturn
    }

    private static makeCategoryLevels(accumulator: ICategoryLevelAccumulator, category: ICategory) {
        const topToBottom = []
        topToBottom.unshift(category.name)
        let current = category.parent
        while (current) {
            topToBottom.unshift(current.name)
            current = current.parent
            if (!current) {
                break
            }
        }
        return this.getLeveledCategories(accumulator, topToBottom, 0, null)
    }

    private static getLeveledCategories(
        accumulator: ICategoryLevelAccumulator, topToBottom: string[],
        index: number, carry: string|null
    ): ICategoryLevelAccumulator {
        if (index >= topToBottom.length) {
            return accumulator
        }
        let name = topToBottom[index]
        if (!carry) {
            carry = name
        } else {
            carry = `${carry} > ${name}`
        }
        accumulator[`lvl${index}`] = accumulator[`lvl${index}`] ?? {}
        accumulator[`lvl${index}`][carry] = true
        return this.getLeveledCategories(accumulator, topToBottom, index + 1, carry)
    }

    private static getUnixTime(value?: string) {
        if (!value) {
            return null
        }
        const parsed = parseISO(value)
        return getUnixTime(parsed)
    }



}