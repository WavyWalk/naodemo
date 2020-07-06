import {Thenable} from "es6-promise";


export class DefferedPromise<T> {

    promise: Promise<T>

    innerResolve!: (value: T) => void
    innerReject!: (reason: any)=> void
    lastThen: Promise<any>

    resolve(value: T) {
        this.innerResolve(value)
    }

    reject(reason: any) {
        this.innerReject(reason)
    }

    constructor() {
        this.promise = new Promise<T>((resolve: any, reject: any)=>{
            this.innerResolve = resolve
            this.innerReject = reject
        })
        this.lastThen = this.promise
    }

    getPromise(): Promise<T> {
        return this.promise
    }

    then(callback: (value: T)=>void): Thenable<any>{
        this.lastThen = (this.lastThen as any).then(callback)
        return this.lastThen
    }

    catch(callback: (reason: any)=>void): Thenable<any> {
      this.lastThen = (this.lastThen as Promise<any>).catch(callback)
      return this.lastThen
    }
}