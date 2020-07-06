import express, {NextFunction, Request, Response} from 'express'
import { Router } from './router'
import {WebpackStatsInfo} from "./assetsmanagement/WebpackStatsInfo";
import "reflect-metadata"
import * as bodyParser from "body-parser"
import {PrismaClient} from "@prisma/client"
import {migratePresetData} from "./presetdata/migratePresetData"
import {ModelRegistrator} from "./modelregistry/ModelRegistrator"
import cookieParser from "cookie-parser"
import {MigrateFieldCategoriesCommand} from "./commands/MigrateFieldCategoriesCommand"
import {EventsAlgoliaIndexer} from "./event/EventsAlgoliaIndexer"
import {FakeEventsGenerator} from "./event/FakeEventsGenerator"

export class App {

    static prisma: PrismaClient

    static async init() {
        ModelRegistrator.run()
        App.prisma = new PrismaClient({
            log: ['query', 'info', 'warn']
        })
        await App.prisma.connect()
        if (await this.runCommand()) {
            return
        }
        const app = express()
        WebpackStatsInfo.readAndAssignStats()
        app.set('view engine', 'pug')
        app.disable('x-powered-by')
        app.use(express.json())
        app.use(cookieParser())
        app.use(bodyParser.json())
        app.use(this.globalErrorHandler)
        Router.setRoutes(app)
        await migratePresetData()
        const port = 3000
        app.listen(port)
        console.log(`listening on ${port}`)
    }

    static async runCommand() {
        let args = process.argv.slice(2)
        const command = args[0] ?? null
        if (!command) {
            return false
        }
        switch (command) {
            case 'migrateFieldCategories':
                await MigrateFieldCategoriesCommand.run()
                break
            case 'indexAllAlgolia':
                await EventsAlgoliaIndexer.indexAll()
                break
            case 'fakeEvents':
                await FakeEventsGenerator.run()
                break
        }
        return true
    }

    static globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction)=>{
        if (res.headersSent) {
            next(error)
        }
        res.status(500)
        res.render('error', {error})
    }

}