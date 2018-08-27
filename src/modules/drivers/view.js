import React, {Component} from 'react';
import {View,ActivityIndicator,Text,FlatList,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {fetchDrivers} from './actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

class DriversPage extends Component {

  componentDidMount() {
    //SetTimeout for show activity indicator
    setTimeout(
    () => this.props.fetchDrivers(30,0),
    2000);
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  _keyExtractor = (item, index) => item.driverId;

  _renderItem = ({item}) => (
    <Card>
        <CardTitle
          title={[item.givenName, ' ', item.familyName]}
          subtitle={item.dateOfBirth}
        />
      <CardContent text={item.nationality} />
      <CardAction 
        separator={true} 
        inColumn={false}>
        <CardButton
          onPress={() => {}}
          title="Races"
          color="#e74c3c"
        />
        <CardButton
          onPress={() => {}}
          title="Info"
          color="#e74c3c"
        />
      </CardAction>
  </Card>
  );

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text>Drivers</Text>
        </View>
        { this.props.drivers.requesting && this.props.drivers.drivers.length === 0 &&
            <View style={styles.content}>
              <ActivityIndicator size="large" color="#e74c3c" /> 
            </View>
        }
        { this.props.drivers.successful && this.props.drivers.drivers.length > 0 &&
          <FlatList
          data={this.props.drivers.drivers}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drivers: state.driversReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrivers: (limit, offset) => {
      dispatch(fetchDrivers(limit, offset))
    },
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '@media ios': {
      marginTop: 20,
    },
    '@media android': {
      marginTop: 30,
    },
    backgroundColor: '#95a5a6'
  },
  nameText: {
    fontSize: '1.2rem'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

EStyleSheet.build();


export default connect(mapStateToProps, mapDispatchToProps)(DriversPage);