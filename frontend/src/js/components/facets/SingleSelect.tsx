import React from "react"
import { connectMenu } from "react-instantsearch-dom"
import {Input} from "reactstrap"

const SingleSelectBase: React.FC<{
    currentRefinement: any
    refine: (value: any)=>any
    items: any[]
}> = ({
    currentRefinement,
    refine,
    items
}) => {


    return <Input
        type="select"
        value={currentRefinement ?? ''}
        onChange={event => refine(event.currentTarget.value)}
    >
        <option value={''}>Select..</option>
        {items.map(item => (
            <option
                key={item.label}
                value={item.isRefined ? currentRefinement : item.value}
            >
                {item.label}
            </option>
        ))}
    </Input>

}

const SingleSelect = connectMenu(SingleSelectBase) as any

export {SingleSelect}