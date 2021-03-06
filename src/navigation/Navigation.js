import React from 'react';
import {createStackNavigator} from 'react-navigation';
import DriverInfoView from '../modules/drivers/DriverInfoView';
import DriversPageView from '../modules/drivers/DriversPageView';
import RacesView from '../modules/races/RacesView';

const RootStack = createStackNavigator ({
    DriversPage: DriversPageView,
    DraverInfo: DriverInfoView,
    RacesInfo: RacesView
},
{
    initialRouteName: 'DriversPage',
    headerMode: 'none'
}
);

export default RootStack;