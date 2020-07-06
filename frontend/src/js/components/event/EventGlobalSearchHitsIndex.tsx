import React from "react"
import { connectHits } from "react-instantsearch-dom"
import {Event} from '../../models/Event'
import {ModelCollection} from "front-model"
import {EventListItemShow} from "./EventListItemShow"

const BaseHits: React.FC<{
    hits: any[]
}> = ({
    hits
}) => {

    let events = new ModelCollection(...hits.map((it)=>{
        return new Event(it)
    }))

    return <div className="hits-index">
        {events.map((it)=>{
            return <EventListItemShow key={it.id} event={it}/>
        })}
    </div>
}

const EventGlobalSearchHitsIndex = connectHits(BaseHits)

export {EventGlobalSearchHitsIndex}

