"use strict";

import React, {
    Component,
    StyleSheet,
    View,
    Text
} from "react-native";
import { connect } from "react-redux";

class CalendarView extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.text]}>
                    Tapahtumat
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: "transparent",
        fontFamily: "Avenir Next"
    },
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});

const select = store => {
    return {
    }
};

export default connect(select)(CalendarView);
