import React from "react"
import algoliasearch from "algoliasearch"
import {InstantSearch, SearchBox, Configure, RefinementList, CurrentRefinements, Pagination} from "react-instantsearch-dom"
import {algoliaConfigData, getFacetsToRetrieve, getSearchClient} from "../../algolia/AlgoliaConfig"
import {Col, Row} from "reactstrap"
import {EventGlobalSearchFacetsIndex} from "./EventGlobalSearchFacetsIndex"
import {EventGlobalSearchHitsIndex} from "./EventGlobalSearchHitsIndex"
// import {CurrentRefinements} from "../facets/CurrentRefinements"
import {GlobalSearchState} from "../../states/GlobalSearchState"
import {sanitizeLabel} from "../facets/CurrentRefinements"

const EventGlobalSearch: React.FC = () => {

    GlobalSearchState.instance.use()

    return <InstantSearch
        indexName={algoliaConfigData.indexName}
        searchClient={getSearchClient()}
        searchState={GlobalSearchState.instance.searchState}
        onSearchStateChange={GlobalSearchState.instance.onSearchStateChange}
    >
        <Configure
            hitsPerPage={10}
            maxValuesPerFacet={500}
        />
        <Row className="search-box">
            <SearchBox/>
        </Row>
        <Row className="refinements-box">
            <CurrentRefinements
                clearsQuery={false}
                transformItems={(e: any)=>{
                    e.map((it: any)=>{
                        it.label = sanitizeLabel(it.label)
                    })
                    return e
                }}
            />
        </Row>
        <Row>
            <Col lg={4}
                className="facets-sidebar"
            >
                <EventGlobalSearchFacetsIndex/>
            </Col>
            <Col lg={8}>
                <Pagination/>
                <EventGlobalSearchHitsIndex/>
                <Pagination/>
            </Col>
        </Row>
    </InstantSearch>

}

export {EventGlobalSearch}