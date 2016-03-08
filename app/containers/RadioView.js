"use strict";

import React, {
    Component,
    StyleSheet,
    View
} from "react-native";
import { connect } from "react-redux";

class RadioView extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View />
        );
    }
}

const styles = StyleSheet.create({
});

const select = store => {
    return {
    }
};

export default connect(select)(RadioView);
