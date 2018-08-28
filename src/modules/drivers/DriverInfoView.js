import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fetchDriverInfo} from './actions';

class DriverInfoView extends Component {

    componentDidMount() {
      const { navigation } = this.props;
      const driverId = navigation.getParam('{driverId', '');

      this.props.fetchDriverInfo(driverId);
    }

    render () {
        return (
            <View>

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