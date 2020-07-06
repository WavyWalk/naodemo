import * as React from "react";
import { useContext } from "react";

type IStateValue<T> = { state: T }

export class StateModel {

    context!: React.Context<IStateValue<this>>

    protected dispatch!: () => void

    protected reducer = () => {
        return {state: this}
    }

    constructor() {
        this.context = React.createContext(null as any)
    }

    provider = (props: React.PropsWithChildren<any>) => {
        let [{state}, dispatch] = React.useReducer(this.reducer, {state: this})
        this.dispatch = dispatch as any
        return <this.context.Provider value={ {state} }>
            {props.children}
        </this.context.Provider>
    }

    use() {
        const stateValue = useContext(this.context)
        return stateValue.state
    }

}