import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {fetchRacesInfo,setCurrentPage,resetRaces} from './actions';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-cards';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Paginator from '../../components/paginator/paginator';

class RacesView extends Component {

  state = {
    showPaginator: false
  }

  componentDidMount() {
    const driverId = this.props.navigation.getParam('driverId', '');

    this.props.fetchRacesInfo(driverId, 10, this.props.races.offset);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.races.offset != this.props.races.offset){
      this.setState({
        showPaginator: false
      })
      const driverId = this.props.navigation.getParam('driverId', '');
      this.props.fetchRacesInfo(driverId, 10, this.props.races.offset);
    }
  }

  onPageClick = (index) => {
    this.props.setCurrentPage(
      index,
      this.props.races.total, 
      this.props.races.limit, 
      this.props.races.offset)
  }

  _generatePages = () => {
    const totalPages = Math.round(this.props.races.total / this.props.races.limit);
    const currentPage = this.props.races.currentPage

    if (currentPage === 1 && totalPages > 2){
      return [
        { number: currentPage, current: true},
        { number: currentPage + 1},
        { number: currentPage + 2}
      ]
    } else if (currentPage === totalPages && totalPages > 2){
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

  _keyExtractor = (item, index) => item.date;

  onViewableItemsChanged = ({ viewableItems, _ }) => {
    if (viewableItems.slice(-1)[0] && viewableItems.slice(-1)[0].index < this.props.races.races.length - 1 && this.state.showPaginator){
      this.setState({
        showPaginator: false
      })
    }
  }

  _renderItem = ({item}) => {
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

  goBack = () => {
    this.props.resetRaces();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.navbarIcon}>
            <TouchableOpacity onPress={() => this.goBack() }>
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
          onEndReached={() => {
            if (!this.state.showPaginator){
              this.setState({
                showPaginator: true
              })
            }
          }}

        />
        }
        { this.state.showPaginator && 
        !this.props.races.requesting && 
        Math.floor(this.props.races.total / this.props.races.limit) > 1 &&
          <View style={styles.paginator}>
            <Paginator onPageClick={this.onPageClick} pages={this._generatePages()} />
          </View>
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
  },
  paginator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row'
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
    },
    setCurrentPage: (currentPage, total, limit, offset) => {
      dispatch(setCurrentPage(currentPage, total, limit, offset))
    },
    resetRaces: () => {
      dispatch(resetRaces())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesView);
