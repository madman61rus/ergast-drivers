import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fetchDriverInfo} from './actions';
import Hyperlink from 'react-native-hyperlink'

class DriverInfoView extends Component {

    componentDidMount() {
      const { navigation } = this.props;
      const driverId = navigation.getParam('driverId', '');

      this.props.fetchDriverInfo(driverId);
    }

    render () {
      const driverInfo = this.props.drivers.driverInfo
        return (
            <View>
              <View style={styles.navbar}>
                <Text>Info: {[driverInfo.givenName, ' ', driverInfo.familyName]}</Text>
              </View>
              { this.props.drivers.requesting && !this.props.drivers.successful &&
                <View style={styles.content}>
                  <ActivityIndicator size="large" color="#e74c3c" />
                </View>
              }
              <View>
                <View style={{flexDirection: 'row'}}>
                <Text>name: </Text><Text>{[driverInfo.givenName, ' ', driverInfo.familyName]}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text>date of birth: </Text><Text>{driverInfo.dateOfBirth}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text>nationality: </Text><Text>{driverInfo.nationality}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text>permanent number: </Text><Text>{driverInfo.permanentNumber}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text>wiki: </Text><Hyperlink linkDefault={ true }><Text>{driverInfo.url}</Text></Hyperlink>
                </View>
              </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      drivers: state.driversReducer
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchDriverInfo: (driverId) => {
        dispatch(fetchDriverInfo(driverId))
      }
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
  });
  
  EStyleSheet.build();
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(DriverInfoView)