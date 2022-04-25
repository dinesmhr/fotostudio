import './styles/register.css';
import React, { useState } from "react";
import PublicHeader from './header';
import GoogleLogin from 'react-google-login';
const axios = require( "axios" );

export const Register = (props) => {
    const [ users, setusers ] = useState([]);
    const [ firstname, setfirstname ] = useState('');
    const [ lastname, setlastname ] = useState('');
    const [ username, setusername ] = useState('');
    const [ email, setemail ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ termsAggreement, settermsAggreement ] = useState('');
    const [ error, seterror ] = useState({});
    const [ success, setsuccess ] = useState({});

    const checkIfusernameExists = () => {
        async function fetchData() {
            const url = 'fotostudio/api/users';
            let results = await axios.get( url )
            setusers( results.data );
        }
        fetchData();

        let status = false;
        if( users ) {
            users.map( ( value, index ) => {
                if( value.username === username ) {
                    status =  true;
                }
            })
        }
        setusers( [] );
        return status;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        errors.error = false;
        let successs = {};
        if( !firstname ) {
            errors.firstname = "Firstname is required";
            errors.error = true;
        }

        if( !lastname ) {
            errors.lastname = "Lastname is required";
            errors.error = true;
        }

        if( !username ) {
            errors.username = "Username is required";
            errors.error = true;
        } else if( username.length < 5 ) {
            errors.username = "Username must at least 5 letter";
            errors.error = true;
        } else if( username !== username.toLowerCase() ) {
            errors.username = "Username must be all lowercase";
            errors.error = true;
        } else if( checkIfusernameExists() ) {
            errors.username = "Username already taken";
            errors.error = true;
        }

        if( !password ) {
            errors.password = "Password is required";
            errors.error = true;
        } else if( password.length < 6 ) {
            errors.password = "Password must be at least 6 character";
            errors.error = true;
        }

        seterror( errors );
        setsuccess( successs );
        if( !error.error ) {
            const url = `fotostudio/api/create-users`;
            axios.post( url, {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname
            })
            .then(function(res) {
                if( res.data === "success" ) {
                    successs.message = "You have signed up succcessfully!"
                    setsuccess( successs );
                    setfirstname('');
                    setlastname('');
                    setusername('');
                    setpassword('');
                    seterror(false);
                }
            })
        }
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <>
            <PublicHeader attributes = { props.attributes }/>
            <div className="container md:mx-auto max-w-xl   px-4 sm:px-6">
              <form id="fotostudio-signup-form">
                  <div className="fotostudio-signup-form-wrapper py-12 ">
                      <div className="input-wrapper">
                          <div className="form-heading single-field  py-4">
                              <h2 className="mt-2 text-3xl leading-8 font-extrabold font-display tracking-tight text-gray-900 sm:text-4xl text-center">Join Fotostudio</h2>
                          </div>

                          <div className="fotostudio-form-postnotice font-body text-center text-gray-500">
                              Already have an account? <a href="/login" className="underline hover:no-underline hover:text-gray-600">Login</a>
                          </div>

                          <div className="fotostudio-register-field text-center py-8">
                              <a href="#" className="single-register-field   whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent   shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-teal-400 " viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z" fill="rgba(255,255,255,1)"/></svg>
                                  Sign Up With Google
                              </a>
                              <span className="single-register-field"> </span>
                              <span className="single-register-field"> </span>
                          </div>


                          <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Sign Up With Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                          <div className="fotostudio-field-separator text-center pb-4">
                              <span className="bg-white p-2 inline-block relative  z-10 rounded-md text-gray-300"> OR </span>
                          </div>

                          <div  className=" space-y-4">
                            <div className=" grid grid-cols-2 gap-4 ">
                              <div className="fotostudio-firstname single-field ">
                                  <input type="text" id="firstname" name="firstname" autoComplete="given-name" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder="First Name" onChange={ (e) => setfirstname( e.target.value) } value={firstname}/>

                                  { error.firstname &&
                                      <span className="fotostudio-red-note">{ error.firstname }</span>
                                  }
                              </div>

                              <div className="fotostudio-lastname single-field">
                                  <input type="text" id="lastname" name="lastname" autoComplete="given-name" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder="Last Name" onChange={ (e) => setlastname( e.target.value) } value={lastname}/>
                                  { error.lastname &&
                                      <span className="fotostudio-red-note">{ error.lastname }</span>
                                  }
                              </div>

                            </div>

                            <div className="fotostudio-username single-field">
                                <input type="text" id="username" name="username" autoComplete="given-name" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder="Username(only letters,  numbers and underscores)" onChange={ (e) => setusername( e.target.value) } value={username}/>
                                { error.username &&
                                    <span className="fotostudio-red-note">{ error.username }</span>
                                }
                                { success.username &&
                                    <span className="fotostudio-blue-note">{ success.username }</span>
                                }
                            </div>

                            <div className="fotostudio-email single-field">
                                <input type="text" id="email" name="email" autoComplete="given-name" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder="Email Address" onChange={ (e) => setemail( e.target.value) } value={email}/>
                                { error.email &&
                                    <span className="fotostudio-red-note">{ error.email }</span>
                                }
                                { success.email &&
                                    <span className="fotostudio-blue-note">{ success.email }</span>
                                }
                            </div>

                            <div className="fotostudio-password single-field">
                                <input type="password" id="password" name="password" autoComplete="given-name" className="   focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-sm py-3" placeholder="Password(min.6 char)" onChange={ (e) => setpassword( e.target.value) } value={password}/>
                                { error.password &&
                                    <span className="fotostudio-red-note">{ error.password }</span>
                                }
                            </div>

                        <div className="fotostudio-checkbox single-field flex space-x-2">
                            <input type="checkbox" id="termsAggreement" name="termsAggreement" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" onChange={ (e) => settermsAggreement( e.target.value) } value={password}/>
                            <label className="form-label" htmlFor="termsAggreement" className="text-gray-500 text-sm font-body">Creating and account means you're okay with our <a href="#">Terms of Service</a>, <a href="#" className="underline hover:no-underline hover:text-gray-600">Privacy Policy</a> and our default <a href="#" className="underline hover:no-underline hover:text-gray-600">Notification Settings</a></label>
                            { error.password &&
                                <span className="fotostudio-red-note">{ error.password }</span>
                            }
                        </div>

                        <button type="submit" className="fotostudio-submit  whitespace-nowrap inline-flex items-center justify-center px-4 w-full py-2 border border-transparent   shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick= { (e) => onSubmit(e) }>Create Account</button>

                      </div>

                    </div>

                  </div>
              </form>
            </div>
            { success.message &&
                <div className="fotostudio-success-notice">
                    { success.message }
                </div>
            }
        </>
    )
}
