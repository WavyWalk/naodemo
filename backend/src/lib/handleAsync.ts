import {Request, response, Response} from "express";

export const handleAsync = (handler: (request: Request, response: Response, ...rest: any[])=>any) => {
    return function asyncWrap(request: Request, response: Response, ...rest: any[]) {
        const fnReturn = handler(request, response, ...rest)
        const next = rest[rest.length - 1]
        return Promise.resolve(fnReturn).catch(next)
    }
}