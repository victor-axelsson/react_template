import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MyApp from '../core/reducers'
import Bar from './header/bar'
import Footer from './footer/footer'
import { getRoute } from './router'
import { CONSTANTS } from '../core/constants'
import { ENV } from 'core/env'
import { getData } from '../core/persistentStorage'

const store = createStore(MyApp);
if (!ENV.DEV) {
    console.log = function() {};
}

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
            this._onChange();
        });

        //Load user from storage
        var user = getData("user");
        if(!!user){
            user = JSON.parse(user); 
            store.dispatch({
                type: CONSTANTS.LOGIN,
                payload: user
            });
        } 

    }

    _onChange() {
        this.setState(this._getInitialState());
    }

    _getInitialState() {
        let storeState = store.getState();
        /*
        return {
            blurredModalOverlay: storeState.navigation.blurredModalOverlay
        };
        */

        return {}; 
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    componentDidMount() {}

    getFooter() {
        let footer = (<Footer />);
        return footer;
    }

    render() {
       
        let body = (
            <div style={ { height: '100%', display: 'flex', overflow: 'hidden' } }>
                { getRoute(store.getState().navigation.route) }
            </div>
        );

        return (
            <Provider store={ store }>
                <div style={{ height: '100%' }} >
                    <div id={ 'header' }>
                        <Bar />
                    </div>
                    <div id="container"
                        style={ { paddingBottom: 200, paddingTop: 100 } }>
                        { body }
                    </div>
                    <div id={ 'footer' }>
                        { this.getFooter() }
                    </div>
                </div>
            </Provider>
        );
    }
}
