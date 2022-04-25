import React from 'react';
import PublicHeader from './header';

export const Brands = ( props ) => {
    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <h2>Brands</h2>
        </>
    )
}