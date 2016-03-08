"use strict";

import Immutable from "immutable";
import {
    CHANGE_TAB
} from "../actions/navigation";
import Tabs from "../constants/Tabs";

const initialState = Immutable.fromJS({
    currentTab: Tabs.CALENDAR
});

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return state.set("currentTab", action.payload);
        default:
            return state;
    }
}
