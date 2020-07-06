import React from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"


export const sanitizeLabel = (it: string) => {
    const splitted = it.split(':')
    if (splitted.length > 1) {
        return splitted[1]
    }
    return splitted[0]
}

const CurrentRefinementsBase: React.FC<{
    items: any[],
    refine: (value: any) => any
}> = ({
    items,
    refine
}) => {



    return <div>
        {items.map((it)=>{
            return <span
                key={it.label}
                className="selected-refinement"
                onClick={()=>{
                    refine(it.value)
                }}
            >
                {sanitizeLabel(it.label)}
                <span
                    className="cancel-refinement"
                >
                    X
                </span>
            </span>
        })}
    </div>
}

const CurrentRefinements = connectCurrentRefinements(CurrentRefinementsBase)

export {CurrentRefinements}