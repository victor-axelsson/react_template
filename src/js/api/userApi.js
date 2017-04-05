import { post, del, get, put } from 'core/http'
import { CONSTANTS } from 'core/constants'
import { delData, saveData } from 'core/persistentStorage'

/**
* @author Eduard Hallberg
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Logout user
*/
export function logoutUser(dispatch) {
    console.log('# logout #');

    let payload = {}; 
    post('/user/logout', payload, (err, res) => {
        if (!err) {

            //Clear the user from the permanent storage
            delData('user');

            //Dispatch logout event
            dispatch({
                type: CONSTANTS.LOGOUT
            });
        }

        //Go back to the home page
        dispatch({
            type: CONSTANTS.NAVIGATE_TO_PAGE,
            payload: {
                name: CONSTANTS.HOME
            }
        });
    });
}

/**
* @author Eduard Hallberg
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Login user
*/
export function loginUser(dispatch, payload, callback) {
    console.log('# login #');

    post('/user/login', payload, (err, res) => {
        if (!err) {

            // Check if we actually got a user back.
            if (res.user) {
                saveData('user', res.user);

                dispatch({
                    type: CONSTANTS.LOGIN,
                    payload: user
                });
            }else{
                console.log("We should have gotten a user back"); 
            }
        }
        if (!!callback) {
            callback(err, res);
        }
    });
}
