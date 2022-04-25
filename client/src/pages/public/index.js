import './styles/index.css';
import React, { useState, useEffect } from "react";
import PublicHeader from './header';
import Masonry from 'react-masonry-css';
const axios = require("axios");

export const PublicIndex = (props) => {
    const [ categories, setcategories ] = useState([]);
    const [ tags, settags ] = useState([]);
    const [ photos, setphotos ] = useState([]);

    useEffect(() => {
        let isMounted = true;
        async function fetchTagsData() {
            const tagsUrl = 'fotostudio/api/photo-tags';
            let tagsResults = await axios.get( tagsUrl )
            if (isMounted) settags( tagsResults.data );
        }
        fetchTagsData();
        async function fetchCatsData() {
            const catsUrl = 'fotostudio/api/photo-categories';
            let catsResults = await axios.get( catsUrl )
            if (isMounted) setcategories( catsResults.data );
        }
        fetchCatsData();
        async function fetchPhotosData() {
            const photosUrl = 'fotostudio/api/photos';
            let photosResults = await axios.get( photosUrl )
            if (isMounted) setphotos( photosResults.data );
        }
        fetchPhotosData();
        return () => { isMounted = false };
    });

    const imagesContent = photos.map(( photo, index ) => {
        return (
            <figure key={ index } className={ `fstudio-image` }><a href={`/photos/single/${photo.ID}`}><img src={ `http://localhost/fotostudio/uploads/${photo.image_name}` } alt={photo.image_title}/></a></figure>
        )
    })

    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <div className="fotostudioApp">
                <div className="search-Main py-12 bg-gray-50">
                <div className="lg:text-center py-4">
                    <p className="text-base text-gray-400 tracking-widest font-medium font-body tracking-wide uppercase">Stock Free Photos</p>
                    <h2 className="mt-2 leading-8 font-extrabold font-display tracking-tight text-gray-900 sm:text-4xl max-w-3xl mx-auto px-4 sm:px-6">
                        The best free stock photos & videos shared by talented creators
                    </h2>
                </div>

                <div className="fstudio-search-form-wrapper container md:mx-auto max-w-2xl   px-4 sm:px-6 py-8">
                    <form id="fstudio-home-search-form">
                        <input type="search" id="search" className="mt-1 mb-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder={ `Search for free photos and videos` }/>
                    </form>

                    <div className="fstudio-tags-title-wrap font-body">
                        <span className="fstudio-tag-head font-semibold font-display  inline ">{ `#Trending:` }</span>
                        { tags &&
                            <ul className="trends-tag-wrap space-x-4 inline">
                                {
                                    tags.map( ( tag, index ) => {
                                        return(
                                            <li className="inline-block font-body text-gray-600" key={ index } id={ `tag-${tag.ID}` }>{ tag.title }</li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
                </div>

                <div className="fstudio-main-content max-w-7xl mx-auto px-4 sm:px-6 ">
                    { categories &&
                        <ul className="trends-tag-wrap space-x-8 border-b-2 border-gray-100 py-5 text-center">
                            {
                                categories.map( ( category, index ) => {
                                    return (
                                        <li className="inline-block" key={ index } id={ `category-${category.ID}` }>{ category.title }</li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <Masonry
                        breakpointCols={3}
                        className="fstudio-content-images-wrap"
                        columnClassName="fstudio-content-images-column">
                            { imagesContent }
                    </Masonry>
                </div>
            </div>
        </>
    );
}
