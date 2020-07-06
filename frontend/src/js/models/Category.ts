import {BaseModel, HasMany, HasOne, ModelCollection, Property, RequestOptions} from "../libs/frontmodel/src"
import {ApiEndpoint} from "front-model"

export type categoryTypes = 'FIELD' | 'CATEGORY' | 'TARGET_AUDIENCE'

export class Category extends BaseModel {

    @Property
    id?: number

    @Property
    name?: string

    @Property
    parentId?: number

    @HasOne('Category')
    parent?: Category

    @HasMany('Category')
    children!: ModelCollection<Category>

    @Property
    label?: string

    @HasOne('Category')
    value?: Category

    @Property
    checked?: boolean

    @ApiEndpoint('GET', {url: `/api/category/typeField`})
    static indexFieldCategories: (options?: RequestOptions) => Promise<ModelCollection<Category>>

    static async afterIndexFieldCategoriesRequest(options:RequestOptions) {
        return await this.afterIndexRequest(options)
    }

    @ApiEndpoint('GET', {url: `/api/category/typePlain`})
    static indexPlainCategories: (options?: RequestOptions) => Promise<ModelCollection<Category>>

    static async afterIndexPlainCategoriesRequest(options:RequestOptions) {
        return await this.afterIndexRequest(options)
    }

    @ApiEndpoint('GET', {url: `/api/category/typeTargetAudience`})
    static indexTargetAudienceCategories: (options?: RequestOptions) => Promise<ModelCollection<Category>>

    static async afterIndexTargetAudienceCategoriesRequest(options:RequestOptions) {
        return await this.afterIndexRequest(options)
    }

}
