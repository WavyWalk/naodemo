import {BaseModel, HasMany, HasOne, ModelCollection, Property} from "../lib/frontmodel/src"

export type categoryTypes = 'FIELD' | 'PLAIN' | 'TARGET_AUDIENCE' | 'CATEGORY'

export class Category extends BaseModel {

    @Property
    id?: number

    @Property
    name?: string

    @Property
    parentId?: number

    @HasOne('Category')
    parent?: Category

    @HasMany('Children')
    children!: ModelCollection<Category>

}
