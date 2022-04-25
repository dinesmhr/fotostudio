import './styles/login.css';
import React, { useState, useEffect, useContext } from "react";
import PublicHeader from './header';
import { appContext } from '../../App'

const axios = require("axios");

export const Login = () => {
    const [ users, setusers ] = useState([]);
    const [ username, setusername ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ error, seterror ] = useState({});

    const { isLoggedin, updateLoggedInStatus } = useContext(appContext)

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            const url = 'fotostudio/api/users';
            let results = await axios.get( url )
            if (isMounted) setusers( results.data );
        }
        fetchData();
        return () => { isMounted = false };
    }, [] )

    const checkIfusernameExists = () => {
        let status = false;
        if( users ) {
            users.map( ( value, index ) => {
                if( value.username === username ) {
                    status =  true;
                }
            })
        }
        return status;
    }

    const checkIfpasswordExists = () => {
        let status = false;
        if( users ) {
            users.map( ( value, index ) => {
                if( value.username === username ) {
                    if( value.user_pass === password ) {
                        status =  true;
                    }
                }
            })
        }
        return status;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        errors.error = false;

        if( !username && !password ) {
            errors.message = "Empty fields!";
            errors.error = true;
        }

        if( !username ) {
            errors.message = "Username empty!";
            errors.error = true;
        } else if( !checkIfusernameExists() ) {
            errors.message = "Username not exists";
            errors.error = true;
        }

        if( !password ) {
            errors.message = "Password empty!";
            errors.error = true;
        } else if( !checkIfpasswordExists() ) {
            errors.message = "Username or Password incorrect";
            errors.error = true;
        }

        seterror( errors );
        if( !errors.error ) {
            const url =   `fotostudio/api/session/true/${username}`;
            axios.get( url )
            .then(function(res) {
                updateLoggedInStatus( res.data.isLoggedin )
            })
        }
    }

    const onLogout = () => {
        const url = `fotostudio/api/session/false/anonymous`;
        axios.get( url )
        .then(function(res) {
            updateLoggedInStatus( res.data.isLoggedin );
        })
    }

    if( isLoggedin === "true") {
        return (
            <>
                <PublicHeader/>
                You are logged in!!
                <button onClick= {(e) => onLogout() }>Logout</button>
            </>
        )
    }

    if( isLoggedin !== "true" ) {
        return ( 
            <>
            <PublicHeader/>
            <div className="container md:mx-auto max-w-3xl px-5 sm:px-6">
                <form id="fotostudio-login-form">
                    <div className="fotostudio-login-form-wrapper py-12">
                        <div className="input-wrapper">
                            <div className="form-heading single-field pt-4 pb-3">
                                <h2 className="mt-2 text-3xl leading-8 font-extrabold font-display tracking-tight text-gray-900 sm:text-4xl text-center">Welcome Back To Fotostudio</h2>
                            </div>
                            <div className="fotostudio-form-postnotice font-body text-center text-gray-500">
                                Already have an account? <a href="/register" className="underline hover:no-underline hover:text-gray-600">Register</a>
                            </div>
                            <div className="fotostudio-login-field grid grid-cols-3 gap-4 text-center pt-12 pb-8">
                                <div className="single-login-field">
                                    <a href="#" className=" whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent   shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-teal-400 " viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z" fill="rgba(255,255,255,1)"/></svg> Log In With Google
                                    </a>
                                </div>
                                <div className="single-login-field">
                                    <a href="#" className=" whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent   shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-teal-400 " viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" fill="rgba(255,255,255,1)"/></svg> Log In With Facebook
                                    </a>
                                </div>
                                <div className="single-login-field">
                                    <a href="#" className=" whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent   shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-teal-400 " viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="rgba(255,255,255,1)"/></svg> Log In With Twitter
                                    </a>
                                </div>
                            </div>{ /* .fotostudio-login-field */ }

                            <div className="fotostudio-field-separator text-center pb-4">
                                <span className="bg-white p-2 inline-block relative  z-10 rounded-md text-gray-300">OR</span>

                            </div>

                            <div className="container md:mx-auto max-w-xl px-4 sm:px-6 space-y-4">
                                { error.message &&
                                    <span className="fotostudio-red-note">
                                        { error.message }
                                    </span>
                                }
                                <div className="fotostudio-username single-field grid grid-flow-row auto-rows-max">
                                    <input type="text" name="username" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" onChange={ (e) => setusername( e.target.value ) } placeholder="Username or Email address" value={ username }/>
                                </div>
                                <div className="fotostudio-password single-field">
                                    <input type="password" name="password" className="  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" onChange={ (e) => setpassword( e.target.value ) } placeholder="Password" value={ password }/>
                                    <a href="#" className="font-body text-sm inline-block mt-2 underline text-gray-400">Forgot your password?</a>
                                </div>
                                <button type="submit" className="fotostudio-submit fotostudio-submit  whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent w-full   shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick= { (e) => onSubmit(e) }>Log In</button>
                            </div>
                        </div>
                    </div>{ /* .fotostudio-login-form-wrapper */ }
                </form>
              </div>
            </>
        );
    }
}
