import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader'
const axios = require('axios');

const AdminPhotoTags = (props) => {
	const [ productCats, setproductCats ] = useState([])
	const { userLoggedIn } = props

	useEffect(() => {
		let _this = this
        const url = 'fotostudio/api/photo-tags'
        axios.get( url )
        .then(function(response) {
            setproductCats( response.data )
        })
	})

	return (
		<>
		 	<header>           
				<div className="fstudio-admin-top-header">
					<AdminHeader userLoggedIn = { userLoggedIn }/>
					<table style={{width:"100%"}}>
						<thead>
							<tr>
                                <th>ID</th>
								<th>Name</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								productCats.map( ( productCat, index )  => {
									return (	 
										<tr key={ index }>
											<td>{productCat.ID}</td>
											<td>{productCat.title}</td>
											<td>{productCat.description}</td>
											<td>
												<button><a href={ `/fstudio-photo-tags/:${productCat.ID}` }>{`Edit`}</a></button>
											</td>
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
export default AdminPhotoTags;