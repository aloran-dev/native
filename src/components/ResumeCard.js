import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Icon, Card, H1, Text} from 'native-base';
import {withNavigation} from 'react-navigation';
import StatusIcon from '../components/StatusIcon';

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

class ResumeCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.callback({
            entryDay: this.props.entryDay,
            email: this.props.email,
          })
        }>
        <Card style={styles.wrapper}>
          <View style={styles.card}>
            <View style={styles.card__text}>
              <H1 style={styles.text}>
                {Capitalize(this.props.entryDay.day_of_week)}
              </H1>
              <H1 style={styles.text}>|</H1>
              <H1 style={styles.text}>
                {this.props.entryDay.time_in_plant.hours}hr
              </H1>
              <H1 style={styles.text}>
                {this.props.entryDay.time_in_plant.minutes}min
              </H1>
            </View>
            <StatusIcon cant={this.props.entryDay.incidentes_count} />
          </View>
          <View style={styles.footer}>
            <Icon
              style={styles.footer__icon}
              type="Feather"
              name="chevron-down"
              active
            />
            <Text style={styles.footer__text}>Details of the day</Text>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  card__text: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#707070',
    fontSize: 22,
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer__icon: {
    color: '#B4B3B3',
    marginRight: 10,
  },
  footer__text: {
    color: '#B4B3B3',
    fontSize: 12,
  },
});

export default withNavigation(ResumeCard);
