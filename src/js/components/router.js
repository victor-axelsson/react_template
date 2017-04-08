import React from 'react'
import { CONSTANTS } from 'core/constants'
import Home from './home'
import Login from './login'

export function getRoute(route) {
    // console.log(route);
    if (route.name == CONSTANTS.HOME) {
        return (<Home {...route.passProps}/>);
    }else if(route.name == CONSTANTS.LOGIN) {
        return (<Login {...route.passProps}/>);
    } else{
        //Default route
        return (<Home {...route.passProps}/>);
    }
}