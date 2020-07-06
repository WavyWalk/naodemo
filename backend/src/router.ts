import { PROJECT_DIR } from './index';
import express from "express"
import {WebpackStatsInfo} from "./assetsmanagement/WebpackStatsInfo";
import {userRouter} from "./user/userRouter"
import {sessionRouter} from "./Session/sessionRouter"
import {eventOrganiserRouter} from "./eventorganiser/eventOrganiserRouter"
import {categoryRouter} from "./category/categoryRouter"
import {eventRouter} from "./event/eventRouter"
import {handleAsync} from "./lib/handleAsync"
import {FakeEventsGenerator} from "./event/FakeEventsGenerator"
import {EventsAlgoliaIndexer} from "./event/EventsAlgoliaIndexer"

export class Router {
    
    static setRoutes(app: express.Application) {
        app.use('/public', express.static(`${PROJECT_DIR}/public`))

        const apiRouter = express.Router({mergeParams: true})
        app.use('/api', apiRouter)

        app.use('/test', handleAsync(async (req, res)=>{
            let foo = 10
            await EventsAlgoliaIndexer.indexAll()
        }))
        apiRouter.use('/user', userRouter)
        apiRouter.use('/session', sessionRouter)
        apiRouter.use('/eventOrganiser', eventOrganiserRouter)
        apiRouter.use('/category', categoryRouter)
        apiRouter.use('/event', eventRouter)
        apiRouter.use('/*', (req, res)=>{
            res.sendStatus(404)
        })

        app.get("*", (req, res) => {
            res.render(`${PROJECT_DIR}/public/index`, {
                pathToCssIndex: WebpackStatsInfo.pathToCssIndex,
                pathToJsIndex: WebpackStatsInfo.pathToJsIndex,
            })
        })


    }


}