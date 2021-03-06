import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fetchDriverInfo} from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-cards';

class DriverInfoView extends Component {

    componentDidMount() {
      const { navigation } = this.props;
      const driverId = navigation.getParam('driverId', '');

      this.props.fetchDriverInfo(driverId);
    }

    render () {
      const driverInfo = this.props.drivers.driverInfo;

      const givenName = driverInfo && !this.props.drivers.requesting ? driverInfo.givenName : '';
      const familyName = driverInfo && !this.props.drivers.requesting ? driverInfo.familyName : '';

        return (
            <View style={styles.container}>
              <View style={styles.navbar}>
                <View style={styles.navbarIcon}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Icon name="chevron-left" size={20} color="#e74c3c" />
                </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'flex-end'}}><Text>Info: {[givenName, ' ', familyName]}</Text></View>
              </View>
              { this.props.drivers.requesting && 
                <View style={styles.content}>
                  <ActivityIndicator size="large" color="#e74c3c" />
                </View>
              }
              { !this.props.drivers.requesting && this.props.drivers.driverInfo &&

              <Card>
              <CardTitle
                title={[driverInfo.givenName, ' ', driverInfo.familyName]}
                subtitle={driverInfo.dateOfBirth}
              />
              <CardContent text={`
              nationality: ${driverInfo.nationality}
              permanent number: ${driverInfo.permanentNumber}
              `} />
              <CardAction
              separator={true}
              inColumn={false}>
              <CardButton
                onPress={() => Linking.openURL(driverInfo.url) }
                title="Wiki"
                color="#e74c3c"
              />
              </CardAction>
              </Card>
              
              }
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
      alignItems: 'center',
      '@media ios': {
        marginTop: 20,
      },
      '@media android': {
        marginTop: 30,
      },
      backgroundColor: '#95a5a6'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameText: {
      fontSize: '1.2rem'
    },
    dobText: {
      fontSize: '0.7rem'
    },
    navbarIcon: {
      justifyContent: 'flex-start', 
      marginHorizontal: 10
    }
  });
  
  EStyleSheet.build();
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(DriverInfoView)