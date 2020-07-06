import React, {useRef, useState} from "react"
import {FormState} from "../../libs/formhandling/FormState"
import {BaseModel} from "front-model"
// @ts-ignore
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import classNames from "classnames"
// @ts-ignore
import dateFnsLocalizer from "react-widgets-date-fns";
import {parse} from "date-fns"

dateFnsLocalizer()

const DateSelect: React.FC<{
    onChange?: (value: any)=>any
    type?: string
    formState: FormState,
    model: BaseModel | any
    label?: string
    validate?: (model: BaseModel | any)=>any
    property: string
    showValidity?: boolean
    onKeyPress?: (e: any)=>any
}> = ({
    model,
    formState,
    label,
    property,
    onChange,
    validate,
    type= 'text',
    showValidity = false,
    onKeyPress
}) => {

    const value = model[property]
    const errors = model.getErrorsFor(property) as any[]
    const hasErrors = !!errors
    const ref = useRef()
    const [inputValue, setInputValue] = useState()
    const [isInvalidFormat, setIsInvalidFormat] = useState(false)

    return <div
        className={classNames({
            invalid: hasErrors
        })}
    >
        <p>{label}</p>
        <DateTimePicker
            defaultValue={model[property] ?? new Date()}
            onChange={(date)=>{
                model[property] = date
                setIsInvalidFormat(false)
            }}
            inputProps={{
                component: (props: any) => {
                    return <input {...props} onChange={(e)=> {
                        props.onChange(e)
                        const date = parse(e.target.value, "dd.MM.yyyy HH:mm", new Date())
                        onChange?.(e)
                        if (isNaN(date.valueOf())) {
                            model[property] = undefined
                            return
                        } else {
                            model[property] = date
                        }
                    }}/>
                }
            }}
            format="dd.MM.yyyy HH:mm"
        />
        {isInvalidFormat &&
            <p>please provide date in format: "dd.MM.yyyy HH:mm"</p>
        }
        {hasErrors
        && <div className="isInvalid">
            {errors?.map((it) => {
                return <span>{it}</span>
            })}
        </div>
        }
    </div>
}

export {DateSelect}