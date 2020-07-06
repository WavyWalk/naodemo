import {AlgoliaConnection} from "../algolia/AlgoliaConnection"
import {EventAlgoliaDtoPreparer} from "./EventAlgoliaDtoPreparer"
import {EventRepository} from "./EventRepository"


const getIndex = () => {
    return AlgoliaConnection.getIndexFor('dev_hans_demo')
}

export class EventsAlgoliaIndexer {

    static async run(events: any[]) {
        const index = AlgoliaConnection.getIndexFor('dev_hans_demo')
        const algoliaEvents = []
        for (let it of events) {
            it.objectID = `${it.id}_event`
            it.objectType = `event`
            algoliaEvents.push(await EventAlgoliaDtoPreparer.make(it))
        }
        await index.saveObjects(events)
    }

    static async indexAll() {
        const events = await EventRepository.findAll()
        getIndex().clearObjects()
        await this.run(events)
    }

}