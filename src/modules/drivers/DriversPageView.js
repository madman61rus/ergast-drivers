import React, {Component} from 'react';
import {View,ActivityIndicator,Text,FlatList,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {fetchDrivers, setCurrentPage} from './actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-cards';
import Paginator from '../../components/paginator/paginator';

class DriversPageView extends Component {

  state = {
      showPaginator: false
  }

  componentDidMount() {
    //SetTimeout for show activity indicator
    setTimeout(
    () => this.props.fetchDrivers(30,this.props.drivers.offset),
    2000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drivers.offset != this.props.drivers.offset){
      this.setState({
        showPaginator: false
      })
      this.props.fetchDrivers(30, this.props.drivers.offset);
    }
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
          onPress={() => {this.props.navigation.navigate('RacesInfo', 
          {
            driverId: item.driverId,
            driverName: `${item.givenName} ${item.familyName}`})
          }}
          title="Races"
          color="#e74c3c"
        />
        <CardButton
          onPress={() => {this.props.navigation.navigate('DraverInfo', {driverId: item.driverId})}}
          title="Info"
          color="#e74c3c"
        />
      </CardAction>
  </Card>
  );

  onPageClick = (index) => {
    this.props.setCurrentPage(
      index,
      this.props.drivers.total, 
      this.props.drivers.limit, 
      this.props.drivers.offset)
  }

  _generatePages = () => {
    const totalPages = Math.round(this.props.drivers.total / this.props.drivers.limit);
    const currentPage = this.props.drivers.currentPage

    if (currentPage === 1){
      return [
        { number: currentPage, current: true},
        { number: currentPage + 1},
        { number: currentPage + 2}
      ]
    } else if (currentPage === totalPages){
      return [
        { number: currentPage - 2},
        { number: currentPage - 1},
        { number: currentPage, current: true}
      ]
    }else{
      return [
        { number: currentPage - 1},
        { number: currentPage, current: true},
        { number: currentPage + 1}
      ]
    }
    
  }

  onViewableItemsChanged = ({ viewableItems, _ }) => {
    if (viewableItems.slice(-1)[0] && viewableItems.slice(-1)[0].index < this.props.drivers.drivers.length - 1 && this.state.showPaginator){
      this.setState({
        showPaginator: false
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text>Drivers</Text>
        </View>
        { this.props.drivers.requesting &&
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
          onEndReachedThreshold={0.2}
          onViewableItemsChanged={this.onViewableItemsChanged}
          onEndReached={() => {
            if (!this.state.showPaginator){
              this.setState({
                showPaginator: true
              })
            }
          }}

        />
        }
        { this.state.showPaginator && !this.props.drivers.requesting &&
          <View style={styles.paginator}>
            <Paginator onPageClick={this.onPageClick} pages={this._generatePages()} />
          </View>
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
    setCurrentPage: (currentPage, total, limit, offset) => {
      dispatch(setCurrentPage(currentPage, total, limit, offset))
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
  nameText: {
    fontSize: '1.2rem'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginator: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    alignSelf: 'center',
    flexDirection: 'row'
  }
});

EStyleSheet.build();


export default connect(mapStateToProps, mapDispatchToProps)(DriversPageView);
