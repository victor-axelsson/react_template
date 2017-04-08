import { CONSTANTS } from '../constants'
import { initialState } from '../initialState'

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {

        case CONSTANTS.LOGIN:
            var newState = Object.assign({}, state, {
                isLoggedIn: true,
                user: action.payload
            });

            console.log(newState); 
            return newState;

        case CONSTANTS.LOGOUT:
            var newState = Object.assign({}, state, {
                isLoggedIn: false
            });
            return newState;
    
        default:
            return state;
    }
}