import  React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicHeader from './header';
import Masonry from 'react-masonry-css';
const axios = require("axios");

export const SinglePhoto = (props) => {
    const { photoId } = useParams();
    const [ singePhotoData, setsingePhotoData ] = useState([]);
    const [ authorData, setauthorData ] = useState([]);
    const [ similarPhotosData, setsimilarPhotosData ] = useState([]);

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            const url = `http://localhost:5000/fotostudio/api/single-photo/${photoId}`;
            let results = await axios.get( url )
            if (isMounted) setsingePhotoData( results.data );
            console.log(singePhotoData)
        }
        fetchData();

        async function fetchsimilarPhotosData() {
            const url = `http://localhost:5000/fotostudio/api/photos`;
            let results = await axios.get( url )
            if (isMounted) setsimilarPhotosData( results.data );
        }
        fetchsimilarPhotosData();

        if( Array.isArray(singePhotoData) && singePhotoData.length ) {
            async function fetchAuthorData() {
                const url = `http://localhost:5000/fotostudio/api/single-author/${singePhotoData[0].author_id}`;
                let results = await axios.get( url )
                if (isMounted) setauthorData( results.data );
            }
            fetchAuthorData();
        }

        return () => { isMounted = false };
    }, [] )

    const similarPhotosContent = similarPhotosData.map(( similarphoto, index ) => {
        return (
            <figure key={ index } className={ `fstudio-image` }><a href={`/photos/single/${similarphoto.ID}`}><img src={ `http://localhost/fotostudio/uploads/${similarphoto.image_name}` } alt={similarphoto.image_title}/></a></figure>
        )
    })

    return(
        <>
            <PublicHeader attributes = { props.attributes }/>
            <div id="fotostudio-single-photo-page">
                <div className="single-header">
                    { Array.isArray(authorData) && authorData.length && 
                        <div className="author-meta">
                            {/* <figure>
                                <img src={ `http://localhost/fotostudio/uploads/${singePhotoData.image_name}` }/>
                            </figure> */}
                            <h2>{ authorData[0].username }</h2>
                            <span className="author-email">{ authorData[0].user_email }</span>
                            <span className="author-follows">1.5kFollowers</span>
                            <span className="author-button">Follow</span>
                            <span className="author-button">Donate</span>
                        </div>
                    }
                    <div className="header-buttons">
                        <span className="author-button">Collection</span>
                        <span className="author-button">Like</span>
                    </div>
                </div>

                <div className="content-wrap">
                    { Array.isArray(singePhotoData) && singePhotoData.length &&
                        <>
                            {
                                singePhotoData.map(( singePhoto, index ) => {
                                    return(
                                        <div key="index">
                                            <figure className="thumbnail">
                                                <img src={ `http://localhost/fotostudio/uploads/${singePhoto.image_name}` }/>
                                            </figure>
                                            <div className="content-description">
                                                {
                                                    singePhotoData.image_description
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                </div>

                <div className="related-photos-section">
                    <h2 className="section-heading">Similar Photos</h2>
                    <Masonry
                        breakpointCols={3}
                        className="related-photos"
                        columnClassName="fstudio-content-images-column">
                            { similarPhotosContent }
                    </Masonry>
                </div>

            </div>{ /* #fotostudio-single-photo-page */ }
        </>
    )
}