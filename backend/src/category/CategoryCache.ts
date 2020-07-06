import {CategoryRepository} from "./CategoryRepository"
import {Category} from "./Category"
import {App} from "../App"


export const getHierarchicalCategories = async (withParents: boolean) => {
    const categories = await CategoryRepository.findAllWithTypeField('FIELD') as unknown as Category[]
    const mapByIds: {[id:string]: Category} = {}
    categories.forEach((it)=>{
        mapByIds[it.id!] = it
    })
    categories.forEach((it)=>{
        const parentId = it.parentId
        if (parentId) {
            const parent = mapByIds[parentId]
            if (withParents) {
                it.parent = parent
            }
            parent.children = parent?.children ?? []
            parent.children.push(it)
        }
    })
    return categories
}

const getMappedById = async () => {
    const categories = await CategoryRepository.findAllWithTypeField('FIELD') as unknown as Category[]
    const mapByIds: {[id:string]: Category} = {}
    categories.forEach((it)=>{
        mapByIds[it.id!] = it
    })
    categories.forEach((it)=>{
        const parentId = it.parentId
        if (parentId) {
            const parent = mapByIds[parentId]
            it.parent = parent
            parent.children = parent?.children ?? []
            parent.children.push(it)
        }
    })
    return mapByIds
}

export class CategoryCache {

    static cachedFieldCategories: Category[]
    static cachedMappedByIds: {[id:number]: Category}

    static async getHierarchy() {
        if (!this.cachedFieldCategories) {
            const categories = await getHierarchicalCategories(false)
            this.cachedFieldCategories = categories.filter((it) => !it.parentId)
        }
        return this.cachedFieldCategories
    }

    static async getMappedByIdWithParents() {
        if (!this.cachedMappedByIds) {
            this.cachedMappedByIds = await getMappedById()
        }
        return this.cachedMappedByIds
    }

}

