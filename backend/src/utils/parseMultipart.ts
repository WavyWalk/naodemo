import {Fields, Files, IncomingForm} from "formidable"
import {Request} from "express"

export const parseMultipart = async (req: Request) => {
    const form = new IncomingForm({multiples: true} as any)
    return new Promise<{[id:string]:any}>((resolve, reject)=>{
        form.parse(req, (err, fields, files)=> {
            if (err) {
                reject(err)
                return
            }
            resolve({...fields, ...files})
        })
    })
}