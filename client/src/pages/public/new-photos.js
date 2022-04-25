import React from 'react';
import PublicHeader from './header';

export const NewPhotos = ( props ) => {
    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <h2>New Photos</h2>
        </>
    )
}