import {FormState} from "./FormState";
import {BaseModel} from "../frontmodel/src";

export interface IFormableProps {

    formState: FormState
    formModel: BaseModel
    property: string
    validateArgs?: any
    validateFun?: any
}