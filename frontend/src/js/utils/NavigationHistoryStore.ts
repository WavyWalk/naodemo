export class NavigationHistoryStore {

    static history: string[] = []

    static leftFromPlaceSearchTo: string | null = null

    static pushPath = (path: string) => {
        const history = NavigationHistoryStore.history
        NavigationHistoryStore.handleFromPlaceSearchNavigation(history, path)
        history.push(path)
        if (history.length > 2) {
            history.shift()
        }
        NavigationHistoryStore.history = history
    }

    static handleFromPlaceSearchNavigation = (history: typeof NavigationHistoryStore.history, path: string) => {
        const last = history[history.length - 1] ?? null
        console.log(`last: ${last}`)
        if (last !== '/places') {
            return
        }
        NavigationHistoryStore.leftFromPlaceSearchTo = path
     }

    static isNavigatedBackToPlaceSearch() {
        const [previous, _] = this.history
        if (!previous) {
            return false
        }
        return previous === this.leftFromPlaceSearchTo
    }


}