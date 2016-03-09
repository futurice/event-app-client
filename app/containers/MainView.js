"use strict";

import React, {
    Component,
    TabBarIOS,
    Text
} from "react-native";
import { connect } from "react-redux";
import CalendarView from "./CalendarView";
import EventMapView from "./EventMapView";
import RadioView from "./RadioView";
import Tabs from "../constants/Tabs";
import * as NavigationActions from "../actions/navigation";

const theme = require('../style/theme');
const Icon = require('react-native-vector-icons/Ionicons'); 

class MainView extends Component {
    constructor() {
        super();
        this._onChangeTab = this._onChangeTab.bind(this);
    }

    _onChangeTab(tab) {
        this.props.dispatch(NavigationActions.changeTab(tab));
    }

    render() {
        return (
            <TabBarIOS tintColor={theme.primary}>
               <Icon.TabBarItem
                    iconName="ios-clock-outline"
                    selectedIconName="ios-clock"
                    title="Tapahtumat"
                    selected={this.props.currentTab === Tabs.CALENDAR}
                    onPress={() => { this._onChangeTab(Tabs.CALENDAR); }}>
                    <CalendarView />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-location-outline"
                    selectedIconName="ios-location"
                    title="Kartta"
                    selected={this.props.currentTab === Tabs.MAP}
                    onPress={() => { this._onChangeTab(Tabs.MAP); }}>
                    <EventMapView />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-play-outline"
                    selectedIconName="ios-play"
                    title="Wappuradio"
                    selected={this.props.currentTab === Tabs.RADIO}
                    onPress={() => { this._onChangeTab(Tabs.RADIO); }}>
                    <RadioView />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
};

const select = store => {
    return {
        currentTab: store.navigation.get("currentTab")
    }
};

export default connect(select)(MainView);
