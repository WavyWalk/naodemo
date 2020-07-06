import {SubscriptionState} from "../libs/statemanagement/SubscriptionState";
import {algoliaConfigData} from "../algolia/AlgoliaConfig"
import {getUnixTime, startOfDay, endOfDay} from "date-fns"

export class GlobalSearchState extends SubscriptionState {

    static instance = new GlobalSearchState()

    searchState: any = {}

    onSearchStateChange = (newState: any) => {
        this.searchState = newState
        this.triggerUpdate()
    }

    refinePrice = (min: any, max: any) => {
        this.searchState = this.searchState ?? {}
        this.searchState.range = this.searchState.range ?? {}
        this.searchState.range.price = {
            min, max
        }
        this.triggerUpdate()
    }

    refineEventDate = (value: any) => {
        let startDate = value.selection?.startDate
        let endDate = value.selection?.endDate

        if (startDate && endDate) {
            startDate = startOfDay(startDate)
            endDate = endOfDay(endDate)
            this.searchState = this.searchState ?? {}
            this.searchState.range = this.searchState.range ?? {}
            this.searchState.range[algoliaConfigData.facets.date.name] = {
                min: getUnixTime(startDate),
                max: getUnixTime(endDate)
            }
            this.triggerUpdate()
        }
    }

    cleanup = () => {
        this.searchState = {}
    }

}