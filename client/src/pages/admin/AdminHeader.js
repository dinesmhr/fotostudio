import React, { Component } from 'react';

class AdminHeader extends Component {
    render() { 
        return ( 
            <>
                <h1 className="fstudio-admin-site-title"><a href="/" target="_blank">Fotostudio</a></h1>
                <div className="fstudio-admin-wrap">
                    <nav id="fstudio-admin-navigation">
                        <ul className="admin-nav-wrap">
                            <li><a href="/fstudio-admin">Dashboard</a></li>
                            <li><a href="/fstudio-users">Users</a></li>
                            <li><a href="/fstudio-products">Products</a></li>
                            <li><a href="/fstudio-categories">Products Categories</a></li>
                            <li><a href="/fstudio-tags">Products Tags</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        );
    }
}

export default AdminHeader;