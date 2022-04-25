import React, { Component } from 'react'
import AdminHeader from './AdminHeader'

const axios = require('axios');

class AdminEditUser extends Component {
    constructor( props ) {
        super( props )
        const { match: { params } } = props;
        this.state = {
            user: [],
            userStatus: ''
        }
    }

    async componentDidMount() {
        const { match: {params} } = this.props;
        const url = `fotostudio/api/single-users/${ params.id }`
        let results = await axios.get( url );
        this.setState({
            user : results.data.data,
        })
    }

    verifyUser() {
        const { match: { params } } = this.props;
        let _this = this
        const url = 'fotostudio/api/edit-table/update-user-status'
        axios.get( url, {
            params: {
                id: params.id,
                status: 'verified'
            }
        })
        .then( function( response ) {
            if( response.data.status === true ) {
                _this.setState({
                    userStatus: 'verified'
                })
            }
        })
    }

    render() {
        const { user, userStatus } = this.state
        return (
            <>
                <header>           
                    <div className="fstudio-admin-top-header">
                        <h1 className="fstudio-admin-site-title">Fotostudio</h1>
                        <AdminHeader userLoggedIn = { this.props.userLoggedIn }/>
                    </div>
                </header>
                <div className="fstudio-single-user-edit">
                    <form id="admin-edit-users-form">
                        { 
                            user.map(( element, index ) => {
                                return(
                                    <div key={ index } >
                                        { element.fullname &&
                                            <div className="admin-single-user-field">
                                                <strong>Fullname :</strong> 
                                                { element.fullname }
                                            </div>
                                        }
                                        { element.username &&
                                            <div className="admin-single-user-field">
                                                <strong>Username :</strong> { element.username }
                                            </div>   
                                        }
                                        { element.birth_date &&
                                            <div className="admin-single-user-field">
                                                <strong>Birth Date :</strong> { element.birth_date }
                                            </div>
                                        }
                                        { element.email &&
                                            <div className="admin-single-user-field">
                                                <strong>Email Address :</strong> { element.email }
                                            </div>
                                        }
                                        { element.parent_name &&
                                            <div className="admin-single-user-field">
                                                <strong>Guardian's Name :</strong> { element.parent_name }
                                            </div>
                                        }
                                        { element.profession &&
                                            <div className="admin-single-user-field">
                                                <strong>Profession :</strong> { element.profession }
                                            </div>
                                        }
                                        { element.contact_number &&
                                            <div className="admin-single-user-field">
                                                <strong>Contact Number :</strong> { element.contact_number }
                                            </div>
                                        }
                                        { element.current_address &&
                                            <div className="admin-single-user-field">
                                                <strong>Current Address :</strong> { element.current_address }
                                            </div>
                                        }
                                        { element.permanent_address &&
                                            <div className="admin-single-user-field">
                                                <strong>Permanent Address :</strong> { element.permanent_address }
                                            </div>
                                        }
                                        { element.document_type &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Submitted :</strong> { element.document_type }
                                            </div>
                                        }
                                        { element.role &&
                                            <div className="admin-single-user-field">
                                                <strong>Role :</strong> { element.role }
                                            </div>
                                        }
                                        { element.pphoto &&
                                            <div className="admin-single-user-field">
                                                <strong>Personal Photo :</strong> <img src={ element.pphoto } />
                                            </div>
                                        }
                                        { element.document_image_one &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Image One :</strong> <img src={ element.document_image_one } />
                                            </div>
                                        }
                                        { element.document_image_two &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Image Two :</strong> <img src={ element.document_image_two } />
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </form>
                    { ( userStatus === 'under-verification' ) &&
                            <button onClick = { (e) => this.verifyUser() }>Verify the user</button>
                    }
                    { ( userStatus === 'not-verified' ) &&
                            <button>Document not available for verification</button>
                    }
                    { ( userStatus === 'verified' ) &&
                            <button>Verified User</button>
                    }
                    <button>Delete the User</button>
                </div>
            </>
        )
    }
}
export default AdminEditUser