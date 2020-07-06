import React from "react"
import {MenuSelect, RangeSlider, RefinementList} from "react-instantsearch-dom"
import {algoliaConfigData} from "../../algolia/AlgoliaConfig"
import {HierarchicalMenu} from "../facets/HierarchicalMenu"
import {RangeSliderRefinement} from "../facets/RangeSlider"
import {DateRange} from "../facets/DateRangeFacet"
import {SingleSelect} from "../facets/SingleSelect"


const EventGlobalSearchFacetsIndex: React.FC = () => {

    return <div className="facets-index">
        <div className="hierarchical-menu-box">
            <p>Fachgebiete</p>
            <HierarchicalMenu
                attributes={[
                    'field.lvl0',
                    'field.lvl1',
                    'field.lvl2',
                    'field.lvl3',
                ]}
            />
        </div>
        <div className="menu-select-box">
            <p>Zielgruppe</p>
            <RefinementList
                attribute={algoliaConfigData.facets.targetAudience.name}
            />
        </div>
        <div className="menu-select-box">
            <p>Kategorie</p>
            <RefinementList
                attribute={algoliaConfigData.facets.plainCategory.name}
            />
        </div>
        <div className="menu-select-box dropdown-facet">
            <p>City</p>
            <SingleSelect
                attribute={algoliaConfigData.facets.addressCity.name}>

            </SingleSelect>
        </div>
        <div className="menu-select-box price-facet">
            <p>Preis</p>
            <RangeSliderRefinement
                attribute={algoliaConfigData.facets.price.name}
            />
        </div>
        <div className="date-range-facet">
            <p>Date</p>
            <DateRange
                attribute={algoliaConfigData.facets.date.name}
            />
        </div>
    </div>
}

export {EventGlobalSearchFacetsIndex}