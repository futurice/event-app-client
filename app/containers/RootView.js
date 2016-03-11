"use strict";

import React, { Component } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createLoggerMiddleware from "redux-logger";
import loggerConfig from "../utils/loggerConfig";
import * as reducers from "../reducers";
import MainView from "./MainView";

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    createLoggerMiddleware(loggerConfig)
)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class RootView extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainView />
            </Provider>
        );
    }
}
