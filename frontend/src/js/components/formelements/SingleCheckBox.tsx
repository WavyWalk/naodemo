import React from "react"
import {FormState} from "../../libs/formhandling/FormState"
import {BaseModel} from "front-model"
import {FormGroup, Input, Label} from "reactstrap"
import classNames from "classnames"

const SingleCheckbox: React.FC<{
    onChange?: (value: any)=>any
    valueOnCheck: any,
    valueOnUncheck: any
    formState: FormState,
    model: BaseModel | any
    label: string
    validate?: ()=>any
    property: string
    showValidity?: boolean
}> = ({
    model,
    formState,
    label,
    property,
    onChange,
    validate,
    valueOnCheck,
    valueOnUncheck,
    showValidity = false,
}) => {

    const errors = model.getErrorsFor(property)
    const isValid = !errors
    const value = model[property]
    const isChecked = valueOnCheck === value

    return <FormGroup check
        className={classNames({
            isInvalid: !isValid
        })}
    >
        <Label check>
            <Input
                type={'checkbox' as any}
                invalid={!isValid}
                checked={isChecked}
                value={value ?? ""}
                onChange={(e)=>{
                    model[property] = isChecked
                        ? valueOnUncheck
                        : valueOnCheck
                    onChange?.(value)
                    validate?.()
                    formState.triggerUpdate()
                }}
            />
            {label}
        </Label>
    </FormGroup>
}

export {SingleCheckbox}