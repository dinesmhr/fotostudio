import React from 'react';
import PublicHeader from './header';

export const Trending = ( props ) => {
    const handleChange = (e) => {
        console.log( e.target.files )
    }

    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <h2>Trending</h2>
            <form id="test-form">
                <label htmlFor="file">Upload Images</label>
                <input type="file" name="file" onChange={ (e) => { handleChange(e) } } />
            </form>
        </>
    )
}