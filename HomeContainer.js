import React, { Component, } from 'react'
import { View, ListView, AsyncStorage, TouchableHighlight, Navigator, AppRegistry, StyleSheet, Text } from 'react-native'
import Item from './Item';
import RestaurantList from './RestaurantList';

export default class HomeContainer extends Component {

  static propTypes = {}

  static defaultProps = {}

   constructor() {
      super();
      this.state = {
         initialPosition: 'unknown',
         latitude: '',
         longitude: '',
         nearbyRestaurants: [],
         restaurantNames: [],
         dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        nav: {}
      }
   }

  
   componentDidMount = () => {
     
     if(this.props.navigator) {
       AsyncStorage.setItem('nav', [this.props.navigator]);
     }
     navigator.geolocation.getCurrentPosition(
         (position) => {
            var initialPosition = position;
            this.getRestaurants(initialPosition);
         },
         (error) => alert(error.message),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
   }
   
   distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
              c(lat1 * p) * c(lat2 * p) * 
              (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
   }
   
   getRestaurants(initPos) {
     let currentLocation = initPos
     let locationUrl = 'https://order.postmates.com/v1/feed/anywhere?'
     let lat = '' 
     let lng = ''
     if(currentLocation) {
       lat = currentLocation['coords'].latitude
       lng = currentLocation['coords'].longitude
       this.setState({
         latitude: lat,
         longitude: lng
       })
     }
     return fetch(locationUrl+'lat='+lat+'&lng='+lng)
      .then((response) => response.json())
      .then((responseJson) => {
        let result = this.getNearbyRestaurants(responseJson);
        this.setState({nearbyRestaurants:result});
     })
      .catch((error) => {
        console.error(error);
      });
   }
  
   getNearbyRestaurants(resultJson) {
     let placesObj = resultJson.feed_items
     let tempArr = []
     let filteredData = []
     const {latitude, longitude} = this.state
     placesObj.map(function(val){
       if(val.type === 'place')
         tempArr.push(val)
     })
     let that = this;
     tempArr.forEach(function(tmp) {
       let obj = {}
       let dist = that.distance(parseFloat(latitude), parseFloat(longitude), tmp.data.lat, tmp.data.lng)
       obj['dist'] = dist
       obj['res_name'] = tmp.data.name
       obj['lat'] = tmp.data.lat
       obj['lng'] = tmp.data.lng
       obj['uuid'] = tmp.data.uuid
       filteredData.push(obj)
     })
     filteredData = filteredData.sort(function(a,b) {
       return a.dist - b.dist
     }).splice(0,5)
     let resNames = []
     filteredData.forEach(function(val) {
       resNames.push(val.name)
     })
     this.setState({restaurantNames: resNames,
                   dataSource: this.state.dataSource.cloneWithRows(filteredData)})
     return filteredData
   }
  
   _navigate() {
      this.props.navigator.push({
          id: 'RestaurantList',
          passProps: {
            restaurant_obj: this.props.rowData
          }
      })
  }
  
   render() {
//      let navObj
     return (
          <View>
             <ListView
              style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(rowData, sectionID, rowID) => 
                <TouchableHighlight
                  onPress={this._navigate.bind(this)}>
                    {this.props.rowData.res_name}
                </TouchableHighlight>
              }/>
         </View>
        );
   }
}


const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   boldText: {
      flex: 1,
      fontWeight: 'bold'
   },
   listContainer: {
      paddingTop: 22
   },
   listItem: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
   },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('HomeContainer', () => HomeContainer);
