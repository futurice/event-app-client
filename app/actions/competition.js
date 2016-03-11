"use strict";

import Endpoints from "../constants/Endpoints";
import ActionTypes from "../constants/ActionTypes";
import LocationManager from "../utils/LocationManager";

const POSTING_ACTION = "POSTING_ACTION";
const ACTION_POST_SUCCESS = "ACTION_POST_SUCCESS";
const ACTION_POST_FAILURE = "ACTION_POST_FAILURE";

const uploadImage = image => {
    return postAction(ActionTypes.IMAGE, { image: image });
};

const postAction = (type, payload) => {
    const actionPayload = {
        location: LocationManager.getLocation(),
        dateTime: new Date().toISOString(),
        team: "TEAM AHMA",
        type
    };
    if (payload) {
        actionPayload.payload = payload;
    }
    return dispatch => {
        dispatch({ type: POSTING_ACTION });
        return fetch(Endpoints.action, {
                method: "POST",
                body: JSON.stringify(actionPayload)
            })
            .then(response => {
                console.log(responseText);
                dispatch({ type: ACTION_POST_SUCCESS });
            })
            .catch(error => {
                console.warn(error);
                dispatch({ type: ACTION_POST_FAILURE });
            });
    };
};

export {
    POSTING_ACTION,
    ACTION_POST_SUCCESS,
    ACTION_POST_FAILURE,
    uploadImage,
    postAction
};
