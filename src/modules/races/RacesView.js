import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {fetchRacesInfo} from './actions';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-cards';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

class RacesView extends Component {

  componentDidMount() {
    const { navigation } = this.props;
    const driverId = navigation.getParam('driverId', '');

    this.props.fetchRacesInfo(driverId, 30, 0);
  }

  _keyExtractor = (item, index) => item.date;

  _renderItem = ({item}) => {
    console.log('item ', item);
    const number = `number: ${item.Results[0].number}`;
    const contentText = 
    `
    Circuit:
      name: ${item.Circuit.circuitName}
      country: ${item.Circuit.Location.country}
      locality: ${item.Circuit.Location.locality}
      round: ${item.round}
    Results :
      ${number}
      position: ${item.Results[0].position}
    `;

    return (  
    <Card>
        <CardTitle
          title={item.Circuit.circuitName}
          subtitle={[' season: ', item.season]}
        />
      <CardContent text={contentText} />
  </Card>)
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.navbarIcon}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
          <Text>Races: {this.props.navigation.getParam('driverName', '')}</Text>
        </View>
        { this.props.races.requesting && 
            <View style={styles.content}>
              <ActivityIndicator size="large" color="#e74c3c" />
            </View>
        }
        { this.props.races.successful && this.props.races.races.length > 0 &&
          <FlatList
          data={this.props.races.races}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.2}
          onViewableItemsChanged={this.onViewableItemsChanged}
          // onEndReached={() => {
          //   if (!this.state.showPaginator){
          //     this.setState({
          //       showPaginator: true
          //     })
          //   }
          // }}

        />
        }
      </View>
    )
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
  nameText: {
    fontSize: '1.2rem'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarIcon: {
    justifyContent: 'flex-start', 
    marginHorizontal: 10
  }
});

EStyleSheet.build();

const mapStateToProps = (state) => {
  return {
    races: state.racesReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRacesInfo: (driverId, limit, offset) => {
      dispatch(fetchRacesInfo(driverId, limit, offset))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesView);
