import React, { Component } from 'react';
import AdminHeader from './AdminHeader'
const axios = require( 'axios' )

class AdminUsers extends Component {
	constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

	componentDidMount() {
		const url =   `fotostudio/api/users`;
		let _this = this;
		axios.get( url )
		.then(function(res) {
			_this.setState( { users: res.data })
		})
	}

	render() {
		const { users } = this.state

		return (
			<>
				<header>           
					<div className="fstudio-admin-top-header">
						<AdminHeader attributes = { this.props.attributes }/> 
						<table style={{width:"100%"}}>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Actions</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{
									users.map( ( user, index )  => {
										return (	 
											<tr key={ index }>
												<td>{user.first_name}</td>
												<td>{user.user_email}</td>
												<td>{user.user_role}</td>
												<td>
													<button><a href={ `/fstudio-users/:${user.Id}` }>{`Edit`}</a></button>
												</td>
												<td>{user.verified}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>					
					</div>
				</header>
			</>
		)
	}
}

export default AdminUsers;