import {IModelProperties} from './interfaces/IModelProperties';
import {ModelCollection} from './ModelCollection'
import {MixinSerializableTrait} from "./modelTraits/MixinSerializableTrait"
import {MixinValidatableTrait} from "./modelTraits/MixinValidatableTrait"
import {IPagination} from "./utils/IPaginatedResponse"

class ModelClassMixinContainer {
    constructor(...args: Array<any>) {
    }
}

export class BaseModel extends MixinSerializableTrait(MixinValidatableTrait(ModelClassMixinContainer)) {
    properties!: IModelProperties;

    static reactKey = 0

    private reactKey!: number

    getReactKey = () => {
        this.reactKey = this.reactKey ?? (BaseModel.reactKey += 1)
        return this.reactKey
    }

    constructor(properties?: IModelProperties) {
        super(properties)
        this.init()
    }

    static jsonRoot = null

    getJsonRoot(): string {
        return (this.constructor as typeof BaseModel).jsonRoot as any
    }

    serialize(root: boolean = true): IModelProperties {
        let objectToReturn: IModelProperties = {}
        let propertiesCopy = {...(this.properties)}

        for (let key of Object.keys(propertiesCopy)) {
            let value = propertiesCopy[key]
            objectToReturn[key] = this.normalizeWhenSerializing(value, false)
        }
        if (root && this.getJsonRoot()) {
            let jsonRoot = this.getJsonRoot()
            let objectToReturnWithRoot: IModelProperties = {}
            objectToReturnWithRoot[jsonRoot] = objectToReturn
            return objectToReturnWithRoot
        } else {
            return objectToReturn
        }
    }

    normalizeWhenSerializing(value: any, root: boolean = false): any {
        if (value instanceof BaseModel) {
            return value.serialize(root)
        } else if (value instanceof ModelCollection) {
            let mapped = value.array.map((it) => {
                return (it as BaseModel).serialize(false)
            })
            return mapped
        } else {
            return value
        }
    }


} 