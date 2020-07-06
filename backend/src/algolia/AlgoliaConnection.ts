import {algoliaConfig} from "../algoliaConfig"
import algoliasearch from 'algoliasearch'

export class AlgoliaConnection {

    static getClient() {
        return algoliasearch(
            algoliaConfig.appId,
            algoliaConfig.apiKey
        )
    }

    static getIndexFor(name: string) {
        return this.getClient().initIndex(name)
    }

}