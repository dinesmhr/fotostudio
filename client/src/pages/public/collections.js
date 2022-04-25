import React from 'react';
import PublicHeader from './header';

export const Collections = ( props ) => {
    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <h2>Collections</h2>
        </>
    )
}