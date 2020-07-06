export function dispatches() {
    return function (target: any, propertyKey: string, descriptor?: any) {
        let original = descriptor.value
        descriptor.value = function(...args: any[]) {
            // @ts-ignore
            original.apply(this, args)
            // @ts-ignore
            this.dispatch()
        }
        return
    }
}