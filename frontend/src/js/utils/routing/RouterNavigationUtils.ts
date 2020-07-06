import {createBrowserHistory} from "history";


const AppHistory = createBrowserHistory();

export class RouterNavigationUtils {

    static history = AppHistory

    static pushToHome() {
        this.history.push('/')
    }

    static pushToError() {
        this.history.push("/eventDatesPresenceError")
    }

}