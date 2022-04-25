import React, { useEffect, useState } from "react";
import PublicHeader from './header';
import Select from 'react-select';
import "./styles/submit.css";
const axios = require("axios");

export const Submit = (props) => {
    const [ author_id, setauthor_id ] = useState('');
    const [ image_title, setimage_title ] = useState('');
    const [ image_description, setimage_description ] = useState('');
    const [ image_name, setimage_url ] = useState('');
    const [ image_extension, setimage_extension ] = useState('');
    const [ image_tags, setimage_tags ] = useState([]);
    const [ image_categories, setimage_categories ] = useState([]);
    const [ images, setimages ] = useState([]);
    const [ error, seterror ] = useState({});
    const [ success, setsuccess ] = useState({});
    const [ temppath, settemppath ] = useState();
    const [ isModal, setisModal ] = useState(false);
    const [ fadeClass, setfadeClass ] = useState('fadeOut');
    const { isLoggedin, isLoggedinUser } = props.attributes;

    const categoriesOptions = [
        { label: 'Holiday', value: '1' },
        { label: 'Weekend', value: '2' },
        { label: 'Trip', value: '3' },
        { label: 'Travel', value: '4' },
        { label: 'Buildings', value: '5' },
        { label: 'Sports', value: '6' }
    ];

    useEffect( async () => {
        if( isLoggedinUser ) {
            const url = `fotostudio/api/userid/${isLoggedinUser}`;
            let results = await axios.get( url );
            setauthor_id( results.data[0].Id );
        }
    }, [] );

    const onSubmit = (e) => {
        e.preventDefault();
        console.log( images );
        let errors = {};
        let successs = {};
        if( !image_title ) {
            errors.error = true;
            errors.image_title = 'Title of your photo must not be empty!!';
        }

        if( Object.keys( images ).length === 0 ) {
            errors.error = true;
            errors.message = 'None of the image is uploaded';
        } else {
            errors.error = false;
        }
        seterror( errors )
        if( !errors.error ) {
            Object.keys( images ).forEach(function( key ) {
                const url = `fotostudio/api/create-product`;
                axios.post( url, {
                    author_id: author_id,
                    image_title: image_title,
                    image_description: image_description,
                    image_name: images[key].name,
                    image_extension: images[key].type,
                    image_tags: JSON.stringify( image_tags ),
                    image_categories: JSON.stringify( image_categories ),
                    file: images[key]
                })
                .then(function(res) {
                    if( res.data === "success" ) {
                        successs.success = true;
                        successs.message = 'Photo submitted successfully!!';
                        setsuccess( successs )
                        setimage_title('');
                        setimage_description('');
                        setimage_url('');
                        setimage_extension('');
                        setimage_tags('');
                        setimage_categories('');
                        setimages([]);
                    }
                })
            });
        }
    }

    const onFileChange = (e) => {
        settemppath(e.target.value);
        let totalImages = images.concat( Object.values( e.target.files ) );
        setimages( totalImages );
    }

    const readFileAsURL = (file) => {
        let bloburl = URL.createObjectURL(file);
        return bloburl;
    }

    const onOpenModal = (e) => {
        e.preventDefault();
        setisModal(true);
        setfadeClass('fadeIn');
    }

    const onCloseModal = (e) => {
        e.preventDefault();
        setisModal(false);
        setfadeClass('fadeOut');
    }

    /**
     * Set each image title on change
     * 
     */
    const setImageTitle = ( val, key) => {
        images[key].image_title = val;
        setimages(images);
    }

    /**
     * Set each image description on change
     * 
     */
     const setImageDescription = ( val, key) => {
        images[key].image_description = val;
        setimages(images);
    }

    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <form id="fotostudio-signup-form">
                    <div className="form-heading single-field py-4">
                        <h2 className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 ">
                            { ( isLoggedin === 'true' ) &&
                                `Hi! ${isLoggedinUser}. Have you been following our product review documentation?`
                            }
                            { ( isLoggedin !== 'true' ) &&
                                `Hey there! You are not logged in yet!!. Please log in to our platform and be part of us. Login Now`
                            }
                        </h2>
                    </div>
                    <div className="fotostudio-signup-form-wrapper py-12">
                        <div className="input-wrapper flex flex-wrap -mx-4 overflow-hidden">
                            <div className="terms-condition-wrap">
                                <h2>Terms & Conditions</h2>
                            </div>
                            <div className="fotostudio-images single-field  my-4 px-4 w-1/3 overflow-hidden xl:w-3/5">
                                <div className="modal-popup-main-wrap">
                                    <button className="modal-open-button bg-blue-500 text-white p-2 rounded text-2xl font-bold" onClick={ (e) => onOpenModal(e)}>Upload photos</button>
                                    { isModal &&
                                        <div id="fotostudio-submit-product-images-popup" className={ `main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated ${fadeClass} faster` }
                                        style={{background: "rgba(0,0,0,.7)"}}>
                                            <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                                <div className="modal-content py-4 text-left px-6">
                                                    <div className="modal-header">
                                                        Submit to Fotostudio
                                                    </div>
                                                    <div className="upload-photos-wrap">
                                                        <label htmlFor="images">Upload photos</label>
                                                        <input type="file" onChange={ (e) => onFileChange(e) } multiple/>
                                                    </div>
                                                    { Array.isArray(images) && ( images.length > 0 ) &&
                                                        images.map( (image, key ) => {
                                                            return (
                                                                <div key={key} className="upload-single-item-wrap">
                                                                    <div key={key} className="upload-single-photo">
                                                                        <span className="delete-button cancel-item"><svg height="15pt" viewBox="0 0 329.26933 329" width="15pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></span>
                                                                        <img src={ readFileAsURL( image ) } alt={ image.name }/>
                                                                    </div>
                                                                    <div className=" my-4 px-4 w-1/3 overflow-hidden xl:w-2/5 space-y-4">
                                                                        <div className="fotostudio-image_title single-field">
                                                                            <label className="form-label font-display font-semibold text-sm" htmlFor="image_title">Image Title</label>
                                                                            <input type="text" id="image_title" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3 mt-2" name="image_title" placeholder="Enter image title" onChange={ (e) => setImageTitle( e.target.value, key) }/>
                                                                            { error.image_title &&
                                                                                <span className="fotostudio-red-note">{ error.image_title }</span>
                                                                            }
                                                                        </div>
                                                                        <div className="fotostudio-image_description single-field">
                                                                            <label className="form-label font-display font-semibold text-sm" htmlFor="image_description">Add Description</label>
                                                                            <textarea type="text" id="image_description" name="image_description" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3 mt-2" placeholder="Enter image description" onChange={ (e) => setImageDescription( e.target.value, key ) }/>
                                                                        </div>
                                                                        <div className="fotostudio-image_tags single-field">
                                                                            <label className="form-label font-display font-semibold text-sm" htmlFor="image_tags">Tags</label>
                                                                            <Select className="mt-2"
                                                                                value={ image_tags }
                                                                                isMulti = { true }
                                                                                isSearchable = { true }
                                                                                onChange={ ( newimage_tags ) => setimage_tags( newimage_tags ) }
                                                                                options ={ categoriesOptions }
                                                                            />
                                                                            { error.image_tags &&
                                                                                <span className="fotostudio-red-note">{ error.image_tags }</span>
                                                                            }
                                                                        </div>

                                                                        <div className="fotostudio-image_categories single-field">
                                                                            <label className="form-label font-display font-semibold text-sm" htmlFor="image_categories">Categories</label>
                                                                            <Select className="mt-2"
                                                                                value={ image_categories }
                                                                                isMulti = { true }
                                                                                isSearchable = { true }
                                                                                onChange={ ( newimage_categories ) => setimage_categories( newimage_categories ) }
                                                                                options ={ categoriesOptions }
                                                                            />
                                                                            { success.image_categories &&
                                                                                <span className="fotostudio-blue-note">{ success.image_categories }</span>
                                                                            }
                                                                        </div>

                                                                        {/* <button type="submit" className="fotostudio-submit fotostudio-submit fotostudio-submit  whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent w-full   shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick= { (e) => onSubmit(e) }>Submit my product</button> */}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <button className="modal-close-button p-3 bg-blue-500 text-white rounded" onClick={ (e) => onCloseModal(e) }>Cancel</button>
                                                    <button className="modal-close-button p-3 bg-blue-500 text-white rounded" onClick={ (e) => onCloseModal(e) }>Submit My Photos</button>
                                                </div>{ /* .modal-content */ }
                                            </div>
                                        </div>
                                    }
                                </div>{/*.modal-popup-main-wrap*/}
                            </div>
                        </div>
                        { error.error &&
                            <span className="fstudio-red-note">
                                { error.message }
                            </span>
                        }
                        { success.success &&
                            <span className="fstudio-success-note">
                                { success.message }
                            </span>
                        }
                    </div>
                </form>
            </div>
            <div className="fotostudio-form-postnotice">
                Goto to my account page <a href="/myaccount">My Account</a>
            </div>
        </>
    )
}
