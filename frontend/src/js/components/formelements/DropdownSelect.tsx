import React from "react"
import {ISelectPair} from "./ISelectPair"
import {FormGroup, Input, Label} from "reactstrap"
import {FormState} from "../../libs/formhandling/FormState"
import {BaseModel} from "front-model"
import classNames from "classnames"
import Combobox from "react-widgets/lib/Combobox"

const DropdownSelect: React.FC<{
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
    onChange,
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
        <Combobox
            value={selectedValue ?? ''}
            valueField="value"
            textField={"readableName"}
            placeholder={label}
            onChange={(value)=>{
                if (typeof value !== 'string' ) {
                    value = value.value
                }
                model[property] = value
                formState.triggerUpdate()
            }}
            suggest={true}
            data={selectPairs}
        />
    </FormGroup>
}

export {DropdownSelect}