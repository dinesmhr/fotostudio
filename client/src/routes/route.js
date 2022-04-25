import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Admin imports
import AdminDashboard from '../pages/admin/dashboard';
import AdminUsers from '../pages/admin/users';
import AdminProducts from '../pages/admin/products';
import AdminEditUser from '../pages/admin/editUsers';
import AdminEditProduct from '../pages/admin/editProducts';
import AdminProductCategories from '../pages/admin/photo-categories';
import AdminProductTags from '../pages/admin/photo-tags';

//Public routes
import { PublicIndex } from "../pages/public/index";
import { Trending } from "../pages/public/trending";
import { Explore } from "../pages/public/explore";
import { Brands } from "../pages/public/brands";
import { NewPhotos } from "../pages/public/new-photos";
import { Collections } from "../pages/public/collections";
import { Submit } from "../pages/public/submit";
import { Register } from "../pages/public/register";
import { Login } from "../pages/public/login";
import { SinglePhoto } from "../pages/public/single-photo";

export const Routes  = (props) => {
    const { isLoggedin } = props.attributes
    return (
        <>
            <BrowserRouter>
                <Switch>
                    { 
                        /**
                         * Admin routes
                         */ 
                    }
                    <Route path="/fstudio-admin" component={() => <AdminDashboard attributes = { props.attributes } />}></Route>
                    <Route path="/fstudio-users" exact component={() => <AdminUsers attributes = { props.attributes } />}></Route>
                    <Route path="/fstudio-products" exact component={() => <AdminProducts />}></Route>
                    <Route path="/fstudio-users/:id" component={(props) => <AdminEditUser attributes = { props.attributes }/>}></Route>
                    <Route path="/fstudio-products/:id" component={(props) => <AdminEditProduct attributes = { props.attributes }/>}></Route>
                    <Route path="/fstudio-categories" exact component={() => <AdminProductCategories attributes = { props.attributes } />}></Route>
                    <Route path="/fstudio-tags" exact component={() => <AdminProductTags attributes = { props.attributes } />}></Route>
                    { 
                        /**
                         * Public routes
                         */ 
                    }
                    <Route path="/" exact component={() => <PublicIndex attributes = { props.attributes }/>}></Route>
                    <Route path="/trending" exact component={() => <Trending attributes = { props.attributes }/>}></Route>
                    <Route path="/explore" exact component={() => <Explore attributes = { props.attributes }/>}></Route>
                    <Route path="/brands" exact component={() => <Brands attributes = { props.attributes }/>}></Route>
                    <Route path="/new-photos" exact component={() => <NewPhotos attributes = { props.attributes }/>}></Route>
                    <Route path="/collections" exact component={() => <Collections attributes = { props.attributes }/>}></Route>
                    <Route path="/login" exact component={() => <Login attributes = { props.attributes } />}></Route>
                    { ( isLoggedin !== 'true' ) &&
                        <Route path="/register" exact component={() => <Register attributes = { props.attributes }/>}></Route>
                    }
                    <Route path="/submit-product" exact component={() => <Submit attributes = { props.attributes }/>}></Route>

                    {
                        /**
                         * Photo Pages
                         * 
                         */
                    }
                    <Route path="/photos/single/:photoId" exact component={() => <SinglePhoto attributes = { props.attributes }/>}></Route>
                </Switch>
            </BrowserRouter>
        </> 
    );
}