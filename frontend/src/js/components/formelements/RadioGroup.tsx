import React from "react"
import {ISelectPair} from "./ISelectPair"
import {FormGroup, Input, Label} from "reactstrap"
import {FormState} from "../../libs/formhandling/FormState"
import {BaseModel} from "front-model"
import classNames from "classnames"

const RadioGroup: React.FC<{
    formState: FormState,
    model: BaseModel | any
    selectPairs: ISelectPair[]
    label: string
    property: string
    validate?: ()=>any
    onChange?: (value?: any)=>any
}> = ({
    selectPairs,
    label,
    formState,
    model,
    property,
    validate,
    onChange
}) => {

    const selectedValue = model[property]
    const errors = model.getErrorsFor(property)
    const isValid = !errors

    return <FormGroup tag={'fieldset'}>
        <Label
            className={classNames({
                'isInvalid': !isValid
            })}
        >{label}</Label>
        {selectPairs.map((it)=>{
            return <FormGroup check
                key={it.value}
            >
                <Label>
                    <Input
                        type="radio"
                        checked={selectedValue === it.value}
                        onChange={()=>{
                            model[property] = it.value
                            validate?.()
                            onChange?.(it.value)
                            formState.triggerUpdate()
                        }}
                    />
                    <span>{it.readableName}</span>
                </Label>
            </FormGroup>
        })}
    </FormGroup>
}

export {RadioGroup}