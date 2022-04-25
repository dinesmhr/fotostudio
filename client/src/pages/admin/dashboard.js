import React, { Component } from 'react';
import AdminHeader from './AdminHeader'

class AdminDashboard extends Component {
    render() { 
        return (         	
            <header>
                <div className="fstudio-admin-top-header">
                    <AdminHeader userLoggedIn = { this.props.userLoggedIn }/>
                </div>
            </header>
        );
    }
}
 
export default AdminDashboard;