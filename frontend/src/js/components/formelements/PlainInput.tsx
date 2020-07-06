import React, { useRef } from "react"
import { FormState } from "../../libs/formhandling/FormState"
import { FormGroup, Label, Input } from "reactstrap"
import {BaseModel} from "front-model"
import classNames from "classnames"

const PlainInput: React.FC<{
    onChange?: (value: any)=>any
    type?: string
    formState: FormState,
    model: BaseModel | any
    label: string
    validate?: (model: BaseModel | any)=>any
    property: string
    showValidity?: boolean
}> = ({
    model,
    formState,
    label,
    property,
    onChange,
    validate,
    type= 'text',
    showValidity = false
}) => {

    const errors = model.getErrorsFor(property)
    const firstError = errors?.[0]
    const isValid = !errors
    const value = model[property]

    return <FormGroup>
        <Label>
            {label}
        </Label>
        <Input
            type={type as any}
            invalid={!isValid}
            value={value ?? ""}
            onChange={(e)=>{
                model[property] = e.target.value
                onChange?.(value)
                validate?.(model)
                formState.triggerUpdate()
            }}
        />
        {firstError
        && <p className="isInvalid">
            {firstError}
        </p>
        }
    </FormGroup>
}

export {PlainInput}