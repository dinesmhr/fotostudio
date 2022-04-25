import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader'
const axios = require('axios');

const AdminProducts = (props) => {
	const [ products, setProducts ] = useState([])
	const { userLoggedIn } = props

	useEffect(() => {
		let isMounted = true;
        const url = 'fotostudio/api/photos'
        axios.get( url )
        .then(function(response) {
            if( response.status === 200 ) {
                if (isMounted) setProducts( response.data)
            }
        })
		return () => { isMounted = false };
	})

	return (
		<>
		 	<header>           
				<div className="fstudio-admin-top-header">
					<AdminHeader userLoggedIn = { userLoggedIn }/> 
					<table style = { { width:"100%" } }>
						<thead>
							<tr>
								<th>Image Id</th>
								<th>Image Name</th>
								<th>Image Description</th>
								<th>Image Extension</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								products.map( ( product, index )  => {
									return (	 
										<tr key={ index }>
											<td>{product.ID}</td>
											<td>{product.image_title}</td>
											<td>{product.image_description}</td>
											<td>{product.image_extension}</td>
											<td>{product.status}</td>
											<td>
												<button><a href={ `/fstudio-products/${product.id}` }>{`Edit`}</a></button>
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
export default AdminProducts;