'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Team from "./Team";
import Button from "../../components/common/Button";

const TeamSelector = React.createClass({
  render() {
    return (
      <View>
        <Button onPress={this.props.onShowChooseTeam}>
          {this.props.selectedTeam}
        </Button>
        <Modal
          animated={true}
          transparent={false}
          visible={this.props.isChooseTeamViewOpen}>
          <View style={styles.teamList}>
            {this.props.teams.map(team =>
              <Team
                key={team.get('id')}
                name={team.get('name')}
                onPress={this.props.onSelectTeam.bind(null, team.get('id'))} />
            )}
          </View>
        </Modal>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  teamList: {
    flex: 1,
    paddingTop: 50
  }
});

export default TeamSelector;
