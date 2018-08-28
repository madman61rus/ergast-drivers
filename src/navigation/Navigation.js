import React from 'react';
import {createStackNavigator} from 'react-navigation';
import DriverInfoView from '../modules/drivers/DriverInfoView';
import DriversPageView from '../modules/drivers/DriversPageView';

const RootStack = createStackNavigator ({
    DriversPage: DriversPageView,
    DraverInfo: DriverInfoView
},
{
    initialRouteName: 'DriversPage',
    headerMode: 'none'
}
);

export default RootStack;