import React from 'react'

import { Route } from 'react-router-dom'


import Splash from './Splash'
import UserPage from './UserPage'

export default function Pages() {

    return (
        <>
            <Route exact path="/" component={Splash}/>
            <Route exact path="/user" component={UserPage}/>
        </>
    );
}
