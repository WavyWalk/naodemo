export class LocalStorageManager {

    static appData: {
        loggedInUser?: {[id:string]: any}
    } = {}

    static init() {
        this.appData = this.getAsJson('app') ?? {}
    }

    static flushAppData() {
        this.setAsJson('app', this.appData)
    }

    static set(key: string, value: any) {
        window.localStorage.setItem(key, value)
    }

    static get(key: string) {
        return window.localStorage.getItem(key)
    }

    static setAsJson(key: string, value: any) {
        if (!value) {
            return
        }
        value = JSON.stringify(value)
        window.localStorage.setItem(key, value)
    }

    static getAsJson(key: string) {
        let value = window.localStorage.getItem(key)
        if (!value) {
            return null
        }
        return JSON.parse(value)
    }

}