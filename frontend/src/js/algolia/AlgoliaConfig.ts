import algoliasearch from 'algoliasearch'

export const algoliaConfigData = {

    appId: 'FLC890HPOA',
    apiKey: '21a67458155d077c70f2893b4a43fadb',
    indexName: 'dev_hans_demo',

    facets: {
        educationalPoints: {
            name: 'educationalPoints',
            humanReadableName: 'Fortbildungspunkte'
        },
        addressCity: {
            name: 'eventAddress.city',
            humanReadableName: 'In der Nähe von'
        },
        plainCategory: {
            name: 'plainCategories.name',
            humanReadableName: 'Ketegorie'
        },
        price: {
            name: 'price',
            humanReadableName: 'Preis'
        },
        targetAudience: {
            name: 'targetAudienceCategories.name',
            humanReadableName: 'Zielgruppe'
        },
        date: {
            name: 'eventDates.dateTimestamp',
            humanReadableName: 'Datum'
        },
        fieldCategories: {
            names: [
                'fieldCategoryHierarchy.lvl0',
                'fieldCategoryHierarchy.lvl1',
                'fieldCategoryHierarchy.lvl2',
                'fieldCategoryHierarchy.lvl3',
                'fieldCategoryHierarchy.lvl4',
                'fieldCategoryHierarchy.lvl5',
            ]
        }
    }
}

export const getFacetsToRetrieve = () => {
    let result: any[] = []
    Object.keys(algoliaConfigData.facets).forEach((it: any)=>{
        const entry = (algoliaConfigData.facets as any)[it]
        if (entry.name) {
            result.push(entry.name)
        } else {
            result = result.concat(entry.names)
        }
    })
    return result
}

export const getSearchClient = () => {
    return algoliasearch(
        algoliaConfigData.appId,
        algoliaConfigData.apiKey
    )
}