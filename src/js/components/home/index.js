import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import styles from './index.css'
import Login from '../login'
import Button from '../lib/button'


class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    onClick(){
        this.props.doLogin(); 
    }

    render() {
        let mainContent = (
            <div style={{height: 50, margin:10}}>
                <h3>Please login</h3>
                <Button  onClick={this.onClick.bind(this)}>Login</Button>
            </div>
        ); 

        if(this.props.isLoggedIn){
            mainContent = (<p>Hello there { this.state.user.username }</p>); 
        }

        return (
            <div className={ styles.container }>
                { mainContent }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user, 
        isLoggedIn: state.user.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: () => {
            dispatch({
                type: CONSTANTS.NAVIGATE_TO_PAGE, 
                payload: {
                    name: CONSTANTS.LOGIN,
                    title: "Login"
                }
            }); 
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);