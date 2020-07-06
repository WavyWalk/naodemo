

import { connectHierarchicalMenu } from 'react-instantsearch-dom';
import React from 'react';

const HierarchicalMenuBase: React.FC<any & {
    items: any[],
    refine: (value: any) => any,
}> = (props) => {

    let { items, refine } = props

    return <ul>
        {items.map((item: any) => (
            <li key={item.label}>
                <a
                    style={{fontWeight: item.isRefined ? 'bold' : undefined}}
                    onClick={event => {
                        event.preventDefault();
                        refine(item.value);
                    }}
                >
                    {item.label} ({item.count})
                </a>
                {item.items && (
                    <HierarchicalMenuBase
                        items={item.items}
                        refine={refine}
                    />
                )}
            </li>
        ))}
    </ul>
}

const HierarchicalMenu = connectHierarchicalMenu(HierarchicalMenuBase);

export {HierarchicalMenu}