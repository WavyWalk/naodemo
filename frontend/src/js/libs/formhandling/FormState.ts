import {SubscriptionState} from "../statemanagement/SubscriptionState";
import {updatesSubscribers} from "../statemanagement/decorators/updatesSubscribers";
import {BaseModel} from "../frontmodel/src";

export class FormState extends SubscriptionState {
    model?: BaseModel

    originalModel?: BaseModel

    constructor(model?: BaseModel, originalModel?: BaseModel) {
        super();
        this.model = model
        if (originalModel) {
            this.originalModel = originalModel
        } else if (model) {
            let serialized = model.serialize();
            new BaseModel(serialized)
            this.originalModel = model
        }
        this.init()
    }

    init() {

    }

    @updatesSubscribers()
    replaceOriginalModel(model: BaseModel) {
        this.originalModel = model
    }

    @updatesSubscribers()
    replaceModel(model: BaseModel) {
        this.model = model
    }

    validate: (options?: any) => any = ()=>undefined

}
