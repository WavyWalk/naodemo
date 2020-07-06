import React, {useState} from "react"
import {DateRangePicker} from "react-date-range"
import {fromUnixTime} from 'date-fns'
import {connectRange} from "react-instantsearch-dom"
import {GlobalSearchState} from "../../states/GlobalSearchState"
import {Button} from "reactstrap"

const DateRangeBase: React.FC<{
    min: number | undefined
    max: number | undefined
    currentRefinement: {min: any, max: any}
    refine: (...ags: any[]) => any
    precision: any
}> = ({precision, min, max, currentRefinement, refine, ...props}) => {


    const [initial, setInitial] = useState({min, max})
    const [open, setOpen] = useState(false)

    if (initial.max === undefined || initial.min === undefined) {
        if (min !== undefined) {
            initial.min = min
            setInitial(initial as any)
        }
        if (max !== undefined) {
            initial.max = max
            setInitial(initial as any)
        }
        return null
    }

    const selectionRange = {
        startDate: fromUnixTime(initial.min),
        endDate: fromUnixTime(initial.max),
        key: 'selection',
    }

    if (currentRefinement.min) {
        selectionRange.startDate = fromUnixTime(currentRefinement.min)
    }
    if (currentRefinement.max) {
        selectionRange.endDate = fromUnixTime(currentRefinement.max)
    }

    return (
        open
            ? <div>
                <Button
                    onClick={()=>{
                        setOpen(false)
                    }}
                >
                    close
                </Button>
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={(...args: any[]) => {
                        GlobalSearchState.instance.refineEventDate(args[0])
                    }}
                />
            </div>
            : <Button
                onClick={()=>{
                    setOpen(true)
                }}
            >
                Refine dates
            </Button>
    )

}

const DateRange = connectRange(DateRangeBase)

export {DateRange}